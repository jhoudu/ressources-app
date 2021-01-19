import React, { Component } from 'react'
import { Form, Input, Button, Space, DatePicker, Select } from 'antd';
import { optionsParcours, optionsSource, optionsCible, optionsSecteurs } from '../constants'
import { getArrayFromPostgrestString } from '../utils';

import moment from 'moment';

const { Item } = Form;
const { TextArea } = Input;

const dateFormat = 'DD/MM/YYYY';

class FormulaireRessource extends Component {

    // Sert pour modifier les valeurs du formulaire
    formRef = React.createRef();

    getInitialValues() {
        if (this.props.ressource) {
            const { titre, lien, parcours, description, datepub, source, cible, secteurs, usages } = this.props.ressource

            //console.log('datepub')
            //console.log(datepub)
            //console.log(datepub ? moment(datepub).locale('fr') : null);

            const initialV = {}
            initialV.titre = titre;
            initialV.lien = lien;
            initialV.parcours = parcours;
            initialV.description = description;
            initialV.datepub = datepub ? moment(datepub).locale('fr') : null;
            initialV.source = source;
            initialV.cible = cible;
            initialV.secteurs = getArrayFromPostgrestString(secteurs);
            initialV.usages = usages;

            return initialV;
        }
    }

    render() {

        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            }
        }

        // prend la ressource et la remonte
        const onFinish = (values) => {
            const ressource = {}
            const { titre, lien, parcours, description, datepub, source, cible, secteurs, usages } = values
            if (this.props.ressource !== undefined) {
                ressource.id = this.props.ressource.id
            }
            ressource.titre = titre
            ressource.lien = lien
            ressource.parcours = parcours
            ressource.description = description
            ressource.datepub = datepub
            ressource.source = source
            ressource.cible = cible ? cible : null,
            ressource.secteurs = secteurs ? secteurs : null,
            ressource.usages = usages
            this.props.onDataUpdate(ressource)
        }

        const onFinishFailed = (values) => {
            console.log('KO:', values);
        }

        // bouton annuler
        const handleClick = (e) => {
            e.preventDefault
            this.props.selectionnerRessource(0)
        }

        return (
            <>
                <h1>Modifier une ressource</h1>
                <Form
                    ref={this.formRef}
                    name='basic'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={this.getInitialValues()}>
                    <Item
                        label="Titre"
                        name="titre"
                        rules={[
                            {
                                required: true,
                                message: 'Le titre de la ressource est obligatoire.',
                            },
                        ]}
                    >
                        <Input />
                    </Item>
                    <Item
                        label="Parcours"
                        name="parcours"
                    >
                        <Select options={optionsParcours} style={{ width: 150 }} >
                        </Select>
                    </Item>
                    <Item
                        label="Lien"
                        name="lien"
                        rules={[
                            {
                                required: true,
                                message: 'Le lien est obligatoire.',
                            },
                        ]}
                    >
                        <Input />
                    </Item>

                    <Item
                        label="Description"
                        name="description"
                    >
                        <TextArea />
                    </Item>

                    <Item
                        label="Date publication"
                        name="datepub"
                    >
                        <DatePicker format={dateFormat} />
                    </Item>

                    <Item
                        label="Source"
                        name="source">
                        <Select options={optionsSource} style={{ width: 150 }} >
                        </Select>
                    </Item>
                    <Item
                        label="Cible"
                        name="cible">
                        <Select options={optionsCible} style={{ width: 150 }} >
                        </Select>
                    </Item>
                    <Item
                        label="Secteurs"
                        name="secteurs">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            options={optionsSecteurs}
                        />
                    </Item>
                    <Item {...tailLayout}>
                        <Space>
                            <Button onClick={e => handleClick(e)}>
                                Annuler
                                </Button>
                            <Button type="primary" htmlType="submit">
                                Valider
                                </Button>
                        </Space>
                    </Item>
                </Form>
            </>
        )
    }
}

export default FormulaireRessource