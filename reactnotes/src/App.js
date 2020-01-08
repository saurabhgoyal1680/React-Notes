import React from 'react';
import './App.css';
import NewNote from './NewNote';
import {Layout, Icon, Input, Button} from 'antd';
import swal from '@sweetalert/with-react'

const {Header} =Layout;
const {Search} = Input;

class App extends React.Component{
	constructor(props){
		super(props);
		this.formRef = null;
		this.state={
			newNote : false
		}
	}

	showModal(){
		this.setState({
			visible: true
		})
	}

	handleOk(){
		const { form } = this.formRef.props;
		form.validateFields((err, values) => {
		if (err) {
			return;
		}

		console.log('Received values of form: ', values);
		form.resetFields();
		swal({
			text: "Successfully Noted",
			icon: "success"
		})
		this.setState({ visible: false });
		});
	}

	handleCancel(){
		this.setState({
			visible: false
		})
	}

	saveFormRef= formRef => {
		this.formRef = formRef;
	}

	render(){
		return(
			<div className="mainDiv">
				<Layout>
					<Header className="header" theme="dark">
						<Icon type="form"></Icon>
						ReactNotes
					</Header>
				</Layout>
				<div className="searchBar">
					<Input.Group compact>
						<Button type="primary" icon="plus" onClick={this.showModal.bind(this)}></Button>
						<Search placeholder="Search your note here..." id="searchBox" style={{width:"50%"}} enterButton></Search>
					</Input.Group>
					<NewNote 
						wrappedComponentRef={this.saveFormRef}
						visible={this.state.visible}
						onOk={this.handleOk.bind(this)}
						onCancel={this.handleCancel.bind(this)}>
					</NewNote>
				</div>
			</div>
		)
	}
}

export default App;
