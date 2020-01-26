import React from 'react';
import { Table } from 'antd';
import Notes from './Notes';
import Constants from './Constants';
class Folders extends React.Component{
    render(){
        return(
            <Table 
                rowKey="id" 
                expandedRowRender={record=><Notes folderId={record.id}></Notes>}
                columns={Constants.folderColumns} 
                dataSource={this.props.folders}
            />
        )
    }
}

export default Folders;