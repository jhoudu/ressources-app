import React, { Component } from 'react'
import TableRessources from './TableRessources'
import FormulaireRessource from './FormulaireRessource'

import fichierRessources from '../ressources'

class GestionRessources extends Component {

    constructor(props) {
        console.log('construct')
        super(props);
        this.state = {
            id: '',
        }
    }

    selectionnerRessource = id => {
        this.setState({ id })
    }

    render() {
        console.log(`${this.constructor.name} : render time`)

        return (
            !this.state.id ?
                <TableRessources
                    ressources={this.props.datas}
                    selectionnerRessource={this.selectionnerRessource}
                /> :
                <FormulaireRessource
                    ressource={this.props.datas.get(this.state.id)}
                    onDataUpdate={this.props.onDataUpdate}
                    selectionnerRessource={this.selectionnerRessource}
                />
        )



    }
}

export default GestionRessources