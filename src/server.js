import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import logo from './react.svg';

// 0. Imports pour gérer Keycloack
import { ExpressCookies, SSRKeycloakProvider } from '@react-keycloak/ssr'
import { getKeycloakConfig } from './utils'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css ?
  assets[entrypoint].css.map(asset=>
    `<link rel="stylesheet" href="${asset}">`
  ).join('') : '' : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = '') => {
  return assets[entrypoint] ? assets[entrypoint].js ?
  assets[entrypoint].js.map(asset=>
    `<script src="${asset}"${extra}></script>`
  ).join('') : '' : '';
};

const express = require('express');

const server = express()

// 0.5 Ajout définition cookie parser
var cookieParser = require('cookie-parser')

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cookieParser()) // 1. Add cookieParser Express middleware
  .get('/*', (req, res) => {
    const context = {};

    // 2. Create an instance of ExpressCookies passing the current request
    const cookiePersistor = ExpressCookies(req)

    // 3. Wrap the App inside SSRKeycloakProvider
    const markup = renderToString(
      <SSRKeycloakProvider
        keycloakConfig={getKeycloakConfig()}
        persistor={cookiePersistor}
      >
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </SSRKeycloakProvider>
    );

    if (context.url) {
      console.log(context.url)
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Frontend Ressources</title>
        <link rel="shortcut icon" href=${logo}></link>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${cssLinksFromAssets(assets, 'client')}
    </head>
    <body>
        <div id="root">${markup}</div>
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
    </body>
</html>`
      );
    }
  });

export default server;
