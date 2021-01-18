import React, { Component } from 'react'
import TableRessources from './TableRessources'
import FormulaireRessource from './FormulaireRessource'

class GestionRessources extends Component {

    constructor(props) {
        console.log('construct')
        super(props);
        this.state = {
            id: 0,
            create: false,
        }
    }

    selectionnerRessource = id => {
        if(id === undefined) {
            this.setState({ create: true })
        } else {
            this.setState({ id })
        }
    }

    render() {
        console.log(`${this.constructor.name} : render time`)

        return (
            !(this.state.id || this.state.create) ?
                <TableRessources
                    ressources={this.props.datas}
                    onDataDelete={this.props.onDataDelete}
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