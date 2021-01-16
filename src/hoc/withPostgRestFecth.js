import { getPostgRestConfig } from '../utils'
import React, { Component } from 'react'
import { getKeycloakInstance } from '@react-keycloak/ssr';

function withPostgRestFecth(WrappedComponent, resourceName, keyName) {

    return class extends Component {

        //TODOS: vérifier ou mettre status
        status = {};

        constructor(props) {
            super(props);
            this.state = {
                datas: {},
                data: {},
                ready: false,
            }
        }

        async componentDidMount () {
            console.log(`${this.constructor.name} : Component did Mount`)
            await this.getListResources();
        }

        async componentDidUpdate (prevProps, prevState) {
            console.log(`${this.constructor.name} : Component did update`)
            if (prevState.datas === this.state.datas) {
                console.log(`${this.constructor.name} : condition 1 d\'update vérifiée !`)
                if (Object.keys(this.state.data).length !== 0 && prevState.data !== this.state.data) {
                    console.log(`${this.constructor.name} : condition 2 d\'update vérifiée !`)
                    this.state.datas.set(this.state.data.id,this.state.data)
                    await this.updateResource(this.state.data)
                }
            }
        }

        // fonction à passer pour updater une données
        onDataUpdate = data => {
            this.setState({data: data, ready: false,})
         }

        async getListResources () {
            console.log('Lecture'); 
            this.setState({ready: false})
            
            try {
                const response = await fetch(getPostgRestConfig() + resourceName, {
                    "method": "GET"
                })
                const json = await response.json()
                var datasMAP = {}
                if (json.length != 0) {
                    datasMAP = new Map(json.map(i => [i[keyName], i]))
                }
                
                this.status = response["status"]
                console.log('status')
                console.log(this.status)
                this.setState({ datas: datasMAP, ready: true })
                
    
            } catch (err) {
                console.log(err); 
            };
        }

        async updateResource (resource) {
            console.log('Ecriture');
            this.setState({ready: false})
            const keycloak = getKeycloakInstance()
    
            const requestheaders = 
            {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": "Bearer " + keycloak["token"],
                "Prefer": "resolution=merge-duplicates",
            }
    
            try {
                const response = await fetch(getPostgRestConfig() + resourceName, {
                    "method": "POST",
                    "headers": requestheaders,
                    "body": JSON.stringify(resource, undefined, 2)
                })
                this.status = response["status"]
                console.log('status')
                console.log(this.status)
                this.setState({ ready: true })
            } catch (err) {
                console.log(err); 
            };
        }

        render () {
            const {datas} = this.state
            console.log(`${this.constructor.name} : render time for ${this.state.ready?'Wrapped':'Chargement'}`)
            return this.state.ready?<WrappedComponent datas={datas} onDataUpdate={this.onDataUpdate} />:<p>Chargement des données.</p>
        }
    }
}
export {withPostgRestFecth}