import React from 'react'
import { Space, Button } from 'antd';

// keycloack
import { useKeycloak } from '@react-keycloak/ssr'

const GestionConnexion = () => {

    const { keycloak, initialized } = useKeycloak()
    console.log(`initialisée : ${initialized}`)
    console.log(`objet keycloak : ${keycloak}`)
    console.log(`objet token : ${keycloak.tokenParsed}`)
    console.log(`authentifié : ${keycloak.authenticated}`)
    
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