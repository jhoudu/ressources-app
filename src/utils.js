
const serverEnv = (key, def) => process?.env?.[key] ?? def

export function getKeycloakConfig() {
  const envKeycloak = process.env.COMPOSE_KEYCLOAK_URL
  if (typeof window !== 'undefined' && window.env !== 'undefined') {
    return {
      // client
      url: 'http://localhost:8080/auth',
      clientId: 'frontend_ressources',
      realm: 'proto',
    }
  } else {
    if (envKeycloak) { // server
      // docker compose
      return {
        url: serverEnv('KEYCLOAK_URL', `${envKeycloak}/auth`),
        clientId: serverEnv('KEYCLOAK_CLIENT_ID', 'frontend_ressources'),
        realm: serverEnv('KEYCLOAK_REALM', 'proto'),
      }
    } else {
      return {
        url: serverEnv('KEYCLOAK_URL', 'http://localhost:8080/auth'),
        clientId: serverEnv('KEYCLOAK_CLIENT_ID', 'frontend_ressources'),
        realm: serverEnv('KEYCLOAK_REALM', 'proto'),
      }
    }
  }
}

export function getPostgRestConfig() {
  const envPostgrest = process.env.COMPOSE_POSTGREST_URL
  if (typeof window !== 'undefined' && window.env !== 'undefined')
    return 'http://localhost:3003/'; //client
  else //server
    if (envPostgrest)
     return `${envPostgrest}/`  //docker-compose
    else return 'http://localhost:3003/' 

}

export function getArrayFromPostgrestString(string) {
  try {
    if (string)
      return string.replace(/"|\n *|\[| *\]/g, '').split(',');
    else
      return [];
  } catch (e) {
    console.log(e);
  }
}