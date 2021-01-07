import React, { Component } from 'react'
import { Table, Tag } from 'antd';

// keycloack
import { useKeycloak } from '@react-keycloak/ssr'

const TableRessources = (props) => {
        const { keycloak, initialized } = useKeycloak()

        const onModifier = (key, e) => {
            e.preventDefault
            props.selectionnerRessource(key)
        }
        
        const sortDate = (a, b) => {
            //TODO: à améliorer et à refactorer !
            var parts = null
            const da = new Date()
            if (!a) {
                da.setFullYear('1900')
                da.setMonth('01')
                da.setDate('01')
            } else {
                parts = String(a).split('/')
                da.setFullYear(parts[2])
                da.setMonth(parts[1] - 1)
                da.setDate(parts[0])
            }

            const db = new Date()
            if (!b) {
                db.setFullYear('1900')
                db.setMonth('01')
                db.setDate('01')
            } else {
                parts = String(b).split('/')
                db.setFullYear(parts[2])
                db.setMonth(parts[1] - 1)
                db.setDate(parts[0])
            }
            
            return (  da - db)
        }

        const columns = [
            {
                title: 'Titre',
                dataIndex: 'titre',
                key: 'titre',
                render: (text, record) => <a href={record.lien}>{text}</a>,
                width: 350
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
                    //console.log(value)
                    return(!value && !record.description)

                }
            },
            {
                title: 'Date de publication',
                dataIndex: 'datePub',
                key: 'datePub',
                width: 110,
                defaultSortOrder: 'descend',
                sorter: (a, b) => sortDate(a.datePub,b.datePub)
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
                width: 120
            },
            {
                title: 'Secteurs',
                dataIndex: 'secteurs',
                key: 'secteurs',
                render: tags => (
                    <span>
                      {tags.map(tag => {
                        const color = 'geekblue'
                        return (
                          <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                          </Tag>
                        );
                      })}
                    </span>
                ),
                filters: [
                    {
                      text: 'AGROALIMENTAIRE',
                      value: 'Agroalimentaire',
                    },
                    {
                        text: 'TEXTILE',
                        value: 'Textile',
                      },
                ],
                onFilter: (value, record) => record.secteurs.indexOf(value) != -1,
                width: 380
            },
            {
                title: 'Usages',
                dataIndex: 'usages',
                key: 'usages',
                render: tags => (
                    <span>
                      {tags.map(tag => {
                        const color = 'geekblue'
                        return (
                          <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                          </Tag>
                        );
                      })}
                    </span>
                ),
                width: 200
            },
            
        ]

        if (keycloak && keycloak.authenticated) {
            columns.push({
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (text, record) => (
                <a
                    onClick={(e) => onModifier(record.key, e) }
                >
                  Modifier
                </a>
              ),
        })}

        return (

            <>
                <h1>Liste des ressources</h1>
                <div style={{ whiteSpace: 'pre-line' }}>
                    <Table
                        columns={columns}
                        dataSource={Array.from(props.ressources.values())}
                        rowKey="key"
                        pagination={{ pageSize: 5 }}
                        useFixedHeader={true}
                        scroll={{ x: "max-content", y: 'calc(100vh - 318px)' }}
                    />
                </div>
            </>
        )
    
}

export default TableRessources