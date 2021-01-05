import React, { Component } from 'react'
import { Layout } from 'antd';

// keycloack
import { useKeycloak } from '@react-keycloak/ssr'

const Home = () => {

  const { keycloak, initialized } = useKeycloak()

    return (
      <>
        <h1>Accueil</h1>
        Ceci est un prototype de Back-Office de gestion de ressources<br /><br/>
        Jeton Keycloak :
        {initialized ?
          <pre >{JSON.stringify(keycloak, undefined, 2)}</pre>
          : <h2>keycloak initializing.</h2>
        }

      </>
    );
}

export default Home;
