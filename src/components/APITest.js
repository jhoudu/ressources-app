import React, { Component } from 'react'
import { withKeycloak } from '@react-keycloak/ssr';

const fetch = require('node-fetch');   

class APITest extends Component {

    //TODO: Trouver pourquoi le composant est appelé deux fois sur le refresh.
    // Lié au refresh ?


    state = {
        response:[],
        responsePOST:[]
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount () {
        await this.fectchListTodos();
        await this.fectchPOSTTodo();
    }

    async fectchListTodos () {
        console.log('Lecture'); 
        
        try {
            const response = await fetch("http://localhost:3003/ressources", {
                "method": "GET"
            })
            const json = await response.json()
            console.log(json)
            this.setState({response: json})

        } catch (err) {
            console.log(err); 
        };
    }

    async fectchPOSTTodo () {
        console.log('Ecriture'); 

        const keycloak = this.props.keycloak
        const requestheaders = 
        {
            "content-type": "application/json",
            "accept": "application/json",
            "Authorization": "Bearer " + keycloak["token"]
        }

        try {
            const response = await fetch("http://localhost:3003/ressources", {
                "method": "POST",
                "headers": requestheaders,
                "body": "{\"titre\": \"github frontend ressources\", \"lien\": \"https://github.com/jhoudu/frontend-ressources-app\"}"
            })
            console.log(response)
            this.setState({responsePOST: response})
        } catch (err) {
            console.log(err); 
        };
    }

    render () {

        return (
            <>
                <h1>Test d'appels de l'API PostgREST.</h1>
                <h2>Lecture (GET)</h2>
                <div style={{overflowY: 'scroll', height:'calc(100vh - 330px)'}}>
                <pre >{JSON.stringify(this.state.response, undefined, 2)}</pre>
                </div>
                <br/>
                <h2>Ecriture (POST)</h2>
                <pre>Status : {this.state.responsePOST["status"]}</pre>
            </>
        )
    }
}

APITest = withKeycloak(APITest)
export default APITest