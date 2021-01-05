import React, { Component } from 'react'

const fetch = require('node-fetch');   

class APITest extends Component {

    

    state = {
        response:'',
        responsePOST:''
    }

    constructor(props) {
        super(props);

        console.log('lecture')
            
            fetch("http://localhost:3003/todos", {
                "method": "GET"
            })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    response: response
                })
              })
            .catch(err => { console.log(err); 
                return err
            });

            console.log('lecture')
            
            fetch("http://localhost:3003/todos", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                "body": "{\"task\": \"do bad thing\"}"
            })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    responsePOST: response
                })
              })
            .catch(err => { console.log(err); 
                //return err
            });
    }

 

    render () {

        return (
            <>
                <h1>Test d'appels de l'API PostgREST.</h1>
                Lecture
                <pre >{JSON.stringify(this.state.response, undefined, 2)}</pre>
                POST sans droits
                <pre>{JSON.stringify(this.state.responsePOST, undefined, 2)}</pre>
            </>
        )
    }
}

export default APITest