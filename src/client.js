import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';

import { Cookies, SSRKeycloakProvider } from '@react-keycloak/ssr'

// Create a function to retrieve Keycloak configuration parameters -- 'see examples/razzle-app'
import { getKeycloakConfig } from './utils'

// 1. Create an instance of Cookies 
const cookiePersistor = new Cookies()

// 2. Wrap the App inside SSRKeycloakProvider
hydrate(
  <SSRKeycloakProvider
    keycloakConfig={getKeycloakConfig()}
    persistor={cookiePersistor}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SSRKeycloakProvider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept();
}
