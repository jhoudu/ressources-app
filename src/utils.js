
const serverEnv = (key, def) => process?.env?.[key] ?? def

export function getKeycloakConfig() {
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

export function getPostgRestConfig() {
  return 'http://localhost:3003/'
}

export function getArrayFromPostgrestString(string) {
  try {
    if (string != null)
    return string.replace(/"|\n|\[|\]/g,'').split(',').map(x => { return x.trim() });
  else
    return new Array();
  } catch (e) {
    return string
  }
}