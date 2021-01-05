import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';

const { Item } = Form;
const { TextArea } = Input;

class FormulaireRessource extends Component {

    state = {
        ressource: this.props.ressource
    }

    formRef = React.createRef();

    componentDidMount () {
        const { titre, lien, description } = this.props.ressource
        this.formRef.current.setFieldsValue(
            {
                titre: titre,
                lien: lien,
                description: description
            });
    }

    render () {

        

        const layout = {
            labelCol: {
            span: 8,
            },
            wrapperCol: {
            span: 16,
            }
        }
    
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            }
        }
    
        const onFinish = (values) => {
            const ressource = {...this.state.ressource}
            const {titre, lien, description} = values
            ressource.titre = titre
            ressource.lien = lien
            ressource.description = description
            this.props.modifierRessource(ressource)
        }
    
        const onFinishFailed = (values) => {
            console.log('Success:', values);
        }

        return (
            <>
                        <h1>Modifier une ressource</h1>
                        <Form
                            ref={this.formRef}
                            name='basic'
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={this.state.ressources}>

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
                            
                            <Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Item>
                        </Form>
                    </>
        )
    }
}

export default FormulaireRessource