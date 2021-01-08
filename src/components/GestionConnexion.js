import React from 'react'
import { Space, Button } from 'antd';

// keycloack
import { useKeycloak } from '@react-keycloak/ssr'

const GestionConnexion = () => {

    const { keycloak, initialized } = useKeycloak()
    typeof window !== 'undefined' && window.env !== 'undefined'? 
        // client
        console.log('Gestion connexion client') 
        // server
        :console.log('Gestion connexion serveur')
      
    console.log(`initialisé : ${initialized}`)
    console.log(`authentifié : ${keycloak.authenticated}`)
    console.log('keycloak : ')
    console.log(keycloak)
    // Non définit sur le server
    console.log('token parsed : ')
    console.log(keycloak.tokenParsed)
    
    
    return (

        <Space>
            {keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username}
            {!!keycloak.authenticated ?
                <Button onClick={() => keycloak.logout()}>Se déconnecter</Button>
                : <Button type="primary" onClick={() => keycloak.login()}>Se connecter</Button>

            }
        </Space>
    )
}

export default GestionConnexion