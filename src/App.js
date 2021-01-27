import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import GestionRessources from './components/GestionRessources';
import APITest from './components/APITest';
import KeycloakTest from './components/KeycloakTest';
import About from './components/About';
import NotFound from './components/NotFound';
import 'antd/dist/antd.css';
import './App.css'
import HeaderApp from './components/HeaderApp'
import { Layout } from 'antd';

import { withPostgRestFecth } from './hoc/withPostgRestFecth'

import { useKeycloak } from '@react-keycloak/ssr'

const { Content, Footer } = Layout;
const GestionRessourcesWithFP = withPostgRestFecth(GestionRessources, 'ressources', 'id');


const App = () => {
  console.log('App');

  // Ajouté pour forcer le refresh quand on est connecté
  const { keycloak, initialized } = useKeycloak()

  return (

    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <HeaderApp />
      <Content className="site-layout-content" style={{ padding: '0 50px' }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/ressources' component={GestionRessourcesWithFP} />
            <Route path='/apitest' component={APITest} />
            <Route path='/keycloaktest' component={KeycloakTest} />
            <Route path='/about' component={About} />
            <Route component={NotFound} />
          </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer>
    </Layout>
  )
}

export default App;
