import React from 'react';
import './App.css'
import Client from './Client';
import NewFolder from './NewFolder';
import NewNote from './NewNote';
import Constants from './Constants';
import {Icon, Input, Button, Modal, Table} from 'antd';
import swal from '@sweetalert/with-react'

const {Search} = Input;

class SearchBar extends React.Component{

    state={
        notesData: [],
        searching: false,
        showNewNoteForm: false,
        showNewFolderForm: false,
        modalTitle: <></>
    }

    searchNote(input){
		Client.get('notes/search/'+input)
		.then(res => {
            this.setState({notesData: res.data,searching: true});
        });
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

    saveFormRef= formRef => {
		this.formRef = formRef;
	}

    handleOk(){
		const { form } = this.formRef.props;
		form.validateFields((err, values) => {
		if (err) {
			return;
		}
		if(values.hasOwnProperty('favourite') && values.favourite === undefined)
			values.favourite = false;
		if(this.state.showNewFolderForm){
			const {name, description} = values;
            Client.post('/folders/add', {name, description})
            .then(()=>this.props.fetchData());
		}
		else{
			const {name, content, favourite, folderId} = values;
            Client.post('/folders/'+folderId+'/notes/add',{name, content, favourite})
            .then(this.props.fetchData());
		}

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
            searching: false,
            showNewNoteForm: false,
            showNewFolderForm: false
        })
    }
    
    render(){
        
        return(
            <div className="searchBar">
                <Input.Group compact>
                    <Button type="primary" icon="plus" onClick={this.showModal.bind(this)}></Button>
                    <Search placeholder="Search your note here..." id="searchBox" style={{width:"90%"}} enterButton onSearch={(value)=>this.searchNote(value)}></Search>
                </Input.Group>
                <Modal
                    visible={this.state.searching}
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                >
                    <Table rowKey="id" columns={Constants.searchNotesColumns} dataSource={this.state.notesData}></Table>
                </Modal>
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
                        visible={this.state.showNewFolderForm ? "block" : "none"}>
                    </NewFolder> :
                    <NewNote 
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.showNewNoteForm ? "block" : "none"}
                        folders={this.props.folders}>
                    </NewNote>
                    }
                </Modal>
            </div>
        )
    }
}

export default SearchBar;