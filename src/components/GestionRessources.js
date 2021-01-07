import React, { Component } from 'react'
import TableRessources from './TableRessources'
import FormulaireRessource from './FormulaireRessource'

import fichierRessources from '../ressources'

class GestionRessources extends Component {

    state = {
        id:'',
        ressources: {}
    }

    constructor(props) {
        super(props);

        if (Object.keys(this.state.ressources).length === 0) {
            var ressourcesMap = new Map(fichierRessources.map(i => [i.key, i]))
            this.state = { ressources: ressourcesMap }
        }
    }

    render() {

        const selectionnerRessource = id => {
            this.setState({id})
        }

        const modifierRessource = newRessource => {
            const ressources = { ...this.state.ressources }
            this.state.ressources.set(newRessource.key,newRessource)
            this.setState(ressources)
            this.setState({id:''})
        }

        return (
            !this.state.id ?
            <TableRessources
                ressources={this.state.ressources}
                selectionnerRessource={selectionnerRessource}
            />:
            <FormulaireRessource
                ressource={this.state.ressources.get(this.state.id)}
                modifierRessource={modifierRessource}
                selectionnerRessource={selectionnerRessource}
            />
        )



}
}

export default GestionRessources