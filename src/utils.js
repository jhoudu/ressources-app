
const serverEnv = (key, def) => process?.env?.[key] ?? def

function getKeycloakConfig() {
  return typeof window !== 'undefined' && window.env !== 'undefined'
    ? {
        // client
        url: 'http://localhost:8080/auth', 
        realm: 'proto', 
        clientId: 'frontend_ressources'
      }
    : {
        // server
        url: serverEnv('KEYCLOAK_URL', 'http://localhost:8080/auth'),
        clientId: serverEnv('KEYCLOAK_CLIENT_ID', 'frontend_ressources'),
        realm: serverEnv('KEYCLOAK_REALM', 'proto'),
      }
}

export { getKeycloakConfig }