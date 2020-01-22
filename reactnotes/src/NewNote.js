import React from "react";
import {Form, Input, Switch} from "antd";

const {TextArea} = Input;

const NewNote = Form.create({name:'form_in_modal'})(
    class extends React.Component{
        render(){
            const {onSubmit, form, visible } = this.props;
            const {getFieldDecorator} = form;
            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 1},
              };
            return(
                <Form layout="horizontal" style={{paddingTop:"2em",display:visible}} onSubmit={onSubmit}>
                    <br/>
                    <Form.Item>
                        {getFieldDecorator('name',{
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
                    <Form.Item {...formItemLayout} label="Add to favourite">
                        {getFieldDecorator('favourite',{
                            valuePropName: 'checked'
                        })(
                            <Switch/>
                        )}
                    </Form.Item>
                </Form>
            )
        }
    }
)
export default NewNote;