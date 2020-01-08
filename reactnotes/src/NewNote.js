import React from "react";
import {Typography, Icon, Form, Input, Modal} from "antd";

const {Title} = Typography;
const {TextArea} = Input;

const NewNote = Form.create({name:'form_in_modal'})(
    class extends React.Component{
        render(){
            const { visible, onCancel, onOk, form } = this.props;
            const {getFieldDecorator} = form;
            return(
                <Modal
                visible={visible}
                onCancel={onCancel}
                onOk={onOk}
                >
                    <Title level={3}><Icon type="diff" />New Note</Title>
                    <Form layout="vertical" style={{paddingTop:"2em"}}>
                        <Form.Item>
                            {getFieldDecorator('title',{
                                rules:[{required: true, message:"Please input title"}]
                            })(
                                <Input placeholder="*Title"></Input>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('content')(
                                <TextArea placeholder="Content" autoSize={{minRows:"4", maxRows:"6"}}></TextArea>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('tags')(
                                <Input placeholder="Tags"></Input>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
)
export default NewNote;