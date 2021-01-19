import React, { Component } from 'react'
import { Table, Tag, Space, Button } from 'antd';
import { render } from 'react-dom';
import { getKeycloakInstance } from '@react-keycloak/ssr';
import moment from 'moment';
import { getArrayFromPostgrestString } from '../utils';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { optionsParcours, optionsSource, optionsCible, optionsSecteurs } from '../constants'

class TableRessources extends Component {

    constructor(props) {
        super(props);
        console.log('construct')
    }

    renderTags = (tags) => {

        if (tags) {
            <span>
                {getArrayFromPostgrestString(tags).map(tag => {
                    const color = 'geekblue'
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        }
    }

    onModifier = (e, key) => {
        e.preventDefault
        this.props.selectionnerRessource(key)
    }

    onAjouter = (e, key) => {
        e.preventDefault
        this.props.selectionnerRessource(-1)
    }

    sortDate = (a, b) => {
        var da = null
        var db = null
        if (a != null && b != null) {
            da = moment(a)
            db = moment(b)
            return da.diff(db, 'days')
        }
        else if (a == null && b != null) return -1
        else if (b == null && a != null) return 1
        else return 0
    }

    formatDate = (date) => {
        if (date != null)
            return moment(date).format('DD/MM/YYYY')
    }


    render() {
        console.log(`${this.constructor.name} : render time`)

        const { ressources } = this.props

        const columns = [
            {
                title: 'Titre',
                dataIndex: 'titre',
                key: 'titre',
                render: (text, record) => <a href={record.lien}>{text}</a>,
                width: 350
            },
            {
                title: 'Parcours',
                dataIndex: 'parcours',
                key: 'parcours',
                width: 120,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                width: 400,
                filters: [
                    {
                        text: 'Vide',
                        value: null,
                    },
                ],
                onFilter: (value, record) => {
                    return (!value && !record.description)

                }
            },
            {
                title: 'Date de publication',
                dataIndex: 'datepub',
                key: 'datepub',
                width: 110,
                defaultSortOrder: 'descend',
                sorter: (a, b) => this.sortDate(a.datepub, b.datepub),
                render: (date) => this.formatDate(date),
            },
            {
                title: 'Source',
                dataIndex: 'source',
                key: 'source',
                width: 120
            },
            {
                title: 'Cible',
                dataIndex: 'cible',
                key: 'cible',
                filters: optionsCible,
                render: (text) => {
                    var color = '';
                    if (text) {
                        if (text === 'Pegi 3' || text === 'Pegi 7')
                            color = 'green'
                        else if (text === 'Pegi 12' || text === 'Pegi 16')
                            color = 'orange';
                        else
                            color = 'red';
                        return (
                            <Tag color={color} key={text}>
                                {text}
                            </Tag>

                        );
                    }


                },
                onFilter: (value, record) => {
                    if (record.cible === null) return false
                    return record.cible.indexOf(value) != -1
                },
                width: 120
            },
            {
                title: 'Secteurs',
                dataIndex: 'secteurs',
                key: 'secteurs',
                render: tags => (
                    tags ?
                    <span>
                        {getArrayFromPostgrestString(tags).map(tag => {
                            const color = 'geekblue'
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>:null
                ),
                filters: optionsSecteurs,
                onFilter: (value, record) => {
                    if (record.secteurs === null) return false
                    return record.secteurs.indexOf(value) != -1

                },
                width: 280
            },
        ]

        const keycloak = getKeycloakInstance()

        if (keycloak && keycloak.authenticated) {
            columns.push({
                title: 'Actions',
                key: 'action',
                fixed: 'right',
                width: 100,
                align: 'center',
                render: (text, record) => (
                    <Space size='middle'>
                        <EditOutlined onClick={(e) => this.onModifier(e, record.id)} />
                        <DeleteOutlined onClick={() => this.props.onDataDelete(record.id)} />
                    </Space>
                ),
            })
        }

        const showAddButtonHandler = () => {
            if(keycloak && keycloak.authenticated)
                return <Button  onClick={(e) => this.onAjouter(e)}>Ajouter une ressource</Button>;
        } 

        return (
            <>
                <h1>Liste des ressources</h1>
                <div style={{ whiteSpace: 'pre-line' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        {showAddButtonHandler()}
                        <Table
                            columns={columns}
                            dataSource={Array.from(ressources.values())}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                            useFixedHeader={true}
                            scroll={{ x: "max-content", y: 'calc(100vh - 318px)' }}
                        />
                    </Space>
                </div>
            </>
        )
    }
}

export default TableRessources