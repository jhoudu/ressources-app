import React, { Component } from 'react'
import { withKeycloak } from '@react-keycloak/ssr';
import { getPostgRestConfig } from '../utils'

const fetch = require('node-fetch');

class APITest extends Component {

    state = {
        response: [],
        responsePOST: []
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.fectchListResources();
        //await this.fectchPOSTResource();
    }

    async fectchListResources() {
        console.log('Lecture');
        console.log(getPostgRestConfig() + 'ressources')

        try {
            const response = await fetch(getPostgRestConfig() + 'ressources', {
                "method": "GET"
            })
            const json = await response.json()
            console.log(json)
            this.setState({ response: json })

        } catch (err) {
            console.log(err);
        };
    }

    async fectchPOSTResource() {
        console.log('Ecriture');

        const keycloak = this.props.keycloak
        const requestheaders =
        {
            "content-type": "application/json",
            "accept": "application/json",
            "Authorization": "Bearer " + keycloak["token"]
        }

        try {
            const response = await fetch(getPostgRestConfig() + 'ressources', {
                "method": "POST",
                "headers": requestheaders,
                "body": "{\"titre\": \"github frontend ressources\", \"lien\": \"https://github.com/jhoudu/frontend-ressources-app\"}"
            })
            console.log(response)
            this.setState({ responsePOST: response })
        } catch (err) {
            console.log(err);
        };
    }

    render() {

        return (
            <>
                <h1>Test d'appels de l'API PostgREST.</h1>
                <h2>Lecture (GET)</h2>
                <div style={{ overflowY: 'scroll', height: 'calc(100vh - 230px)' }}>
                    <pre >{JSON.stringify(this.state.response, undefined, 2)}</pre>
                </div>
                {/*<br />
                <h2>Ecriture (POST)</h2>
                <pre>Status : {this.state.responsePOST["status"]}</pre>*/}
            </>
        )
    }
}

APITest = withKeycloak(APITest)
export default APITest