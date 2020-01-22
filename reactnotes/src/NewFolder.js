import React from "react";
import {Form, Input} from "antd";

const {TextArea} = Input;

const NewNote = Form.create({name:'form_in_modal'})(
    class extends React.Component{
        render(){
            const {onSubmit, form, visible } = this.props;
            const {getFieldDecorator} = form;
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
                        {getFieldDecorator('Description')(
                            <TextArea placeholder="Description" autoSize={{minRows:"4", maxRows:"6"}}></TextArea>
                        )}
                    </Form.Item>
                </Form>
            )
        }
    }
)
export default NewNote;