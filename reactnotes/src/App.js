import React from 'react';
import './App.css';
import Client from './Client';
import {Layout, Menu, Icon} from 'antd';
import SearchBar from './SearchBar';
import Notes from './Notes';

const {Header} =Layout;
// const {SubMenu} = Menu;
const {Sider} = Layout;

class App extends React.Component{
	constructor(props){
		super(props);
		this.formRef = null;
		this.state={
			folders: [],
			isLoading: true,
			fetchData: false
		}
	}

	fetchFolderData(){
		Client.get('/folders/all')
		.then(res=>{
			this.setState({folders: res.data,fetchData: false})
		})
		return;
	}

	componentDidMount(){
		this.fetchFolderData();
	}
	
	componentDidUpdate(){
		if(this.state.fetchData)
			this.fetchFolderData();
	}

	fetchData = () =>{
		this.setState({fetchData:true})
	}

	render(){
		console.log("app render");
		let folders = null;
		if(this.state.folders.length>0)
		folders = this.state.folders.map(folder=><Notes key={folder.id} folder={folder}/>);
		return(
			<div className="mainDiv">
				<Layout style={{height:"100%"}}>
					<Header className="header" theme="dark">
						<Icon type="form"></Icon>
						ReactNotes
						<SearchBar fetchData={this.fetchData} folders={this.state.folders}></SearchBar>
					</Header>
					<Layout>
						<Sider width={200}>
							<Menu mode="inline" multiple={false} style={{height:"100%"}}>
								{folders}
							</Menu>
						</Sider>
						<Layout style={{backgroundColor:"#fff"}}>
							{/* <div className="folders">
								<Folders folders={this.state.folders}></Folders>
							</div> */}
						</Layout>
					</Layout>
				</Layout>
			</div>
		)
	}
}

export default App;
