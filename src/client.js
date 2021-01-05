import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';

// 0. Imports pour gérer Keycloack
import { Cookies, SSRKeycloakProvider } from '@react-keycloak/ssr'
import { getKeycloakConfig } from './utils'

const cookiesPersistor = new Cookies(); // Double correction

hydrate(

  // 1. Wrap the App inside SSRKeycloakProvider
  <SSRKeycloakProvider
    keycloakConfig={getKeycloakConfig()}
    persistor={cookiesPersistor}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SSRKeycloakProvider>,


  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
