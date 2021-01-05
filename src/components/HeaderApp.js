import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import logo from '../react.svg';
import GererConnexion from './GererConnexion'

const { Header } = Layout;

class HeaderApp extends Component {

    handleClick = (item) => {
        if (item.key == 2) {
            this.props.history.push("/ressources/")
        } else if (item.key == 1) {
            this.props.history.push("/")
        } else if (item.key == 3) {
            this.props.history.push("/apitest")
        } else if (item.key == 4) {
            this.props.history.push("/about")
        }
    }


    render() {
        return (
            <Header style={{ color: '#fff' }}>
                <img className='header-logo' src={logo} />
                <div className='connexion-box'>
                    <GererConnexion />
                    </div>

                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1" onClick={this.handleClick}>Accueil</Menu.Item>
                    <Menu.Item key="2" onClick={this.handleClick}>Gestion des ressources</Menu.Item>
                    <Menu.Item key="3" onClick={this.handleClick}>Test API</Menu.Item>
                    <Menu.Item key="4" onClick={this.handleClick}>A propos</Menu.Item>
                </Menu>

            </Header>
        )
    }
}

export default withRouter(HeaderApp)