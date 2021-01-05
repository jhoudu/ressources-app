import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import GestionRessources from './components/GestionRessources';
import APITest from './components/APITest';
import About from './components/About';
import NotFound from './components/NotFound';
import 'antd/dist/antd.css';
import './App.css'
import HeaderApp from './components/HeaderApp'
import { Layout } from 'antd';

const { Content, Footer } = Layout;

const App = () => {
  return (
    <Layout className="layout" style={{ minHeight:'100vh' }}>
      <HeaderApp />
      <Content className="site-layout-content" style={{ padding: '0 50px' }}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/ressources' component={GestionRessources} />
          <Route path='/apitest' component={APITest} />
          <Route path='/about' component={About} />
          <Route component={NotFound} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer>
    </Layout>
  )
}

export default App;
