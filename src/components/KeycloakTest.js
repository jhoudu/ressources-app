import React from 'react'

// keycloack
import { useKeycloak } from '@react-keycloak/ssr'

const KeycloakTest = () => {

    const { keycloak, initialized } = useKeycloak()

    return (
        <>
            <h1>Test de Keycloak</h1>
            {initialized ?
                <div>
                    <h2>Jeton Keycloak :</h2>
                    <div style={{ overflowY: 'scroll', height: 'calc(100vh - 250px)' }}>
                        <pre >{JSON.stringify(keycloak, undefined, 2)}</pre>
                    </div>
                </div>
                : <h2>keycloak initializing.</h2>}
        </>
    );
}

export default KeycloakTest