import React from 'react';
import {Popover, Tag, Button} from 'antd';
const Constants = {

    searchNotesColumns: [
        {
            title: "Folder",
            dataIndex: "folder",
            key: "folder",
            render: folder => folder ? folder.name : null
        },
        {
            title: "Notes",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            render: content => <Popover style={{color:"red"}} content={content} trigger="click">{content.length > 30 ? content.slice(0,30)+"...." :  content}</Popover> 
        },
        {
            title:"Favourite",
            dataIndex:"favourite",
            key:"favourite",
            render: favourite => favourite ? <Tag color="green">FAVOURITE</Tag> : null
        }
    ],
    notesColumns: [
        {
            title: "Notes",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            render: content => <Popover style={{color:"red"}} content={content} trigger="click">{content.length > 30 ? content.slice(0,30)+"...." :  content}</Popover> 
        },
        {
            title:"Favourite",
            dataIndex:"favourite",
            key:"favourite",
            render: favourite => favourite ? <Tag color="green">FAVOURITE</Tag> : null
        },
        {
            title:"Action",
            key:"action",
            render: record => <Button type="primary" onClick={()=> this.deleteNote(record.id)}>Delete</Button>
        }
    ],
    folderColumns: [
        {
            title: "Folder",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        }
    ]
};

export default Constants;