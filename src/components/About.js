import React, { Component } from 'react'
import { Table } from 'antd';

class About extends Component {
    render () {

        const dataSource = [
            {
              cle: '1',
              nom: 'ReactJS',
              description: 'Bibliothèque de composant javascript utilisée pour créer le Frontend',
            },
            {
                cle: '2',
                nom: 'Razzle',
                description: 'Package javascript pour la gestion du Server Side Rendering',
            },
            {
                cle: '3',
                nom: 'antd',
                description: 'Package javascript pour la gestion du design',
            },
          ];
        
const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

        return (
            <>
                <h1>A propos</h1>
                <Table dataSource={dataSource} columns={columns} rowKey="cle"/>
            </>
        )
    }
}

export default About