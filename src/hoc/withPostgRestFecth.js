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
                id: 0,
            }
        }

        async componentDidMount() {
            console.log(`${this.constructor.name} : Component did Mount`)
            await this.getListResources();
        }

        async componentDidUpdate(prevProps, prevState) {
            console.log(`${this.constructor.name} : Component did update`)
            //console.log('prevState, state')
            //console.log(prevState)
            //console.log(this.state)
            if (prevState.datas === this.state.datas) {
                console.log(`${this.constructor.name} : condition d'action vérifiée !`)
                if (Object.keys(this.state.data).length !== 0 && prevState.data !== this.state.data) {
                    console.log(`${this.constructor.name} : condition create ou update vérifiée !`)
                    if (this.state.data.id === undefined) {
                        console.log(`${this.constructor.name} : condition de create vérifiée !`)
                        await this.createResource(this.state.data)
                    } else {
                        console.log(`${this.constructor.name} : condition d\'update vérifiée !`)
                        await this.updateResource(this.state.data)
                    }
                } else if (this.state.id !== '' && prevState.id !== this.state.id) {
                    console.log(`${this.constructor.name} : condition de delete vérifiée !`)
                    await this.deleteResource(this.state.id)
                }
            }
        }

        // fonction à passer pour créer ou updater une données
        onDataUpdate = data => {
            this.setState({ data: data, })

        }

        onDataDelete = id => {
            this.setState({ id: id, })
        }

        async getListResources() {
            console.log('Lecture');
            this.setState({ ready: false })

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
                console.log('status lecture')
                console.log(this.status)
                this.setState({ datas: datasMAP, ready: true })


            } catch (err) {
                console.log(err);
            };
        }

        async updateResource(resource) {
            console.log('Modification');
            this.setState({ ready: false })
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
                console.log('status modification')
                console.log(this.status)
                this.state.datas.set(this.state.data.id, this.state.data)
                this.setState({ ready: true })
            } catch (err) {
                console.log(err);
            };
        }

        async createResource(resource) {
            console.log('Création');
            this.setState({ ready: false })
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
                console.log('status création')
                console.log(this.status)
                Object.defineProperty(this.state.data, 'id', {
                    value: parseInt(response.headers.get('location').split('.')[1]),
                  });
                this.state.datas.set(this.state.data.id, this.state.data)
                console.log(this.state.datas)
                this.setState({ ready: true, id: '', })
            } catch (err) {
                console.log(err);
            };
        }

        async deleteResource(id) {
            console.log('Suppression');
            this.setState({ ready: false })
            const keycloak = getKeycloakInstance()

            const requestheaders =
            {
                "Authorization": "Bearer " + keycloak["token"],
            }

            try {
                const response = await fetch(getPostgRestConfig() + resourceName + '?id=eq.' + id, {
                    "method": "DELETE",
                    "headers": requestheaders,
                })
                this.status = response["status"]
                console.log('status suppression')
                console.log(this.status)
                this.state.datas.delete(this.state.id)
                this.setState({ ready: true, id: '', })
            } catch (err) {
                console.log(err);
            };
        }

        render() {
            console.log(`${this.constructor.name} : render time for ${this.state.ready ? 'Wrapped' : 'Chargement'}`)
            return this.state.ready ? <WrappedComponent datas={this.state.datas} onDataUpdate={this.onDataUpdate} onDataDelete={this.onDataDelete} /> : <p>Chargement des données.</p>
        }
    }
}
export { withPostgRestFecth }