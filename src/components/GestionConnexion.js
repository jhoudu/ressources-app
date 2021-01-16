import React from 'react'
import { Space, Button } from 'antd';

import { useKeycloak } from '@react-keycloak/ssr'

const GestionConnexion = () => {

    const { keycloak, initialized } = useKeycloak()

    return (

        <Space>
            {keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username}
            {!!keycloak.authenticated ?
                <Button onClick={() => keycloak.logout()}>Se déconnecter</Button>
                : <Button type="primary" onClick={() => { keycloak.login(); }}>Se connecter</Button>
            }
        </Space>
    )
}

export default GestionConnexion