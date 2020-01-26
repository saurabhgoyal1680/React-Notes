import React from 'react';
import Client from './Client';
import swal from 'sweetalert';
import {Menu} from 'antd';
const {SubMenu} = Menu;


class Notes extends React.Component{
    constructor(props){
        super(props);
        this.state={
            notesData:[]
        }
    }

    fetchNotesByFolder(folderId){
        Client.get('folders/'+folderId+'/notes')
        .then(res=> {
            this.setState({notesData: res.data})
        })
        console.log(folderId)
        console.log(this.state.notesData);
    };

    componentDidMount(){
        console.log("Hello");
        this.fetchNotesByFolder(this.props.folder.id);
    }

    // componentDidUpdate(){
    //     console.log("Hi");
    //     this.fetchNotesByFolder(this.props.folder.id);
    // }

    deleteNote(noteId){
        swal({
            title: "Are you sure?",
            text: "You won't be able to recover once deleted!",
            icon: "warning",
            dangerMode: true,
            buttons: true
        })
        .then(response => response ? Client.delete('notes/'+noteId) : null)
    }
    
    render(){
        const {folder} = this.props;
        console.log("note render", folder)
        let notesData = this.state.notesData.map(note => {
            return <Menu.Item key={note.id}>{note.name}</Menu.Item>
        });
        return(
            <SubMenu key={folder.id} title={folder.name}>
                {notesData}
            </SubMenu>
        )
    }
}

export default Notes;