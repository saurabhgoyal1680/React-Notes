import React from 'react';
import './App.css';
import NewNote from './NewNote';
import NewFolder from './NewFolder';
import Client from './Client'
import {Layout, Icon, Input, Button, Modal} from 'antd';
import swal from '@sweetalert/with-react'

const {Header} =Layout;
const {Search} = Input;

class App extends React.Component{
	constructor(props){
		super(props);
		this.formRef = null;
		this.state={
			showModal : false,
			showNewNoteForm: false,
			showNewFolderForm: false,
			modalTitle: <></>
		}
	}

	showModal(){
		this.setState({
			showModal: true,
			showNewNoteForm: true,
			modalTitle: <div><Icon type="diff"/>New Note</div>
		})
	}

	showNewNoteForm(){
		this.setState({
			showNewNoteForm: true,
			showNewFolderForm: false,
			modalTitle: <div><Icon type="diff"/>New Note</div>
		})
	}

	showNewFolderForm(){
		this.setState({
			showNewFolderForm: true,
			showNewNoteForm: false,
			modalTitle: <div><Icon type="folder-add"/>New Folder</div>
		})
	}

	handleOk(){
		const { form } = this.formRef.props;
		form.validateFields((err, values) => {
		if (err) {
			return;
		}
		if(values.hasOwnProperty('favourite') && values.favourite === undefined)
			values.favourite = false;
		console.log('Received values of form: ', values);

		form.resetFields();
		let text = "Successfully Noted";
		if(this.state.showNewFolderForm)
			text = "Folder creation successful";
		swal({
			text: text,
			icon: "success"
		})
		this.handleCancel();
		});
	}

	handleCancel(){
		this.setState({
			showModal: false,
			showNewNoteForm: true,
			showNewFolderForm: false,
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
					<Modal
						visible={this.state.showModal}
						onCancel={this.handleCancel.bind(this)}
						title={this.state.modalTitle}
						footer={[
							<Button key="ok" type="submit" onClick={this.handleOk.bind(this)}>Ok</Button>,
							<Button key="cancel" onClick={this.handleCancel.bind(this)}>Cancel</Button>
						]}
					>
						<Button.Group>
							<Button autoFocus onClick={this.showNewNoteForm.bind(this)}>New Note</Button>
							<Button onClick={this.showNewFolderForm.bind(this)}>New Folder</Button>
						</Button.Group>
						{this.state.showNewFolderForm ?
						<NewFolder 
							wrappedComponentRef={this.saveFormRef}
							visible={this.state.showNewFolderForm ? "block" : "none"}
							onSubmit={this.handleOk.bind(this)}
							onCancel={this.handleCancel.bind(this)}>
						</NewFolder> :
						<NewNote 
							wrappedComponentRef={this.saveFormRef}
							visible={this.state.showNewNoteForm ? "block" : "none"}
							onSubmit={this.handleOk.bind(this)}
							onCancel={this.handleCancel.bind(this)}>
						</NewNote>
						}
					</Modal>
					
				</div>
			</div>
		)
	}
}

export default App;
