import React, { Component } from 'react'
import { Form, Input, Button, Space, DatePicker, Select } from 'antd';
import moment from 'moment-timezone';
import { optionsParcours, optionsSource, optionsCible, optionsSecteurs } from '../constants'
import { getArrayFromPostgrestString } from '../utils';

const { Item } = Form;
const { TextArea } = Input;

class FormulaireRessource extends Component {

    formRef = React.createRef();

    componentDidMount() {
        if (this.props.ressource !== undefined) {
            const { titre, lien, parcours, description, datepub, source, cible, secteurs, usages } = this.props.ressource
            this.formRef.current.setFieldsValue(
                {
                    titre: titre,
                    lien: lien,
                    parcours: parcours,
                    description: description,
                    datepub: datepub == null ? null : moment(datepub),
                    source: source,
                    cible: cible,
                    secteurs: getArrayFromPostgrestString(secteurs),
                    usages: usages,
                });
        }
    }

    render() {

        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            }
        }

        const dateFormat = 'DD/MM/YYYY';

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
            ressource.cible = cible
            ressource.secteurs = secteurs
            ressource.usages = usages
            this.props.onDataUpdate(ressource)
        }

        const onFinishFailed = (values) => {
            console.log('KO:', values);
        }

        // bouton annuler
        const handleClick = (e) => {
            e.preventDefault
            this.props.selectionnerRessource('')
        }

        return (
            <>
                <h1>Modifier une ressource</h1>
                <Form
                    ref={this.formRef}
                    name='basic'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={this.props.ressource}>
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