import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Container } from 'react-bootstrap';

import TitleList from "./TitleList"
import SignInList from "./SingInList"
import SignUpList from "./SingUpList"
import NotFound from "./NotFound"
import AdminPage from "./AdminPage"

export default class SiteMainContent extends Component {

	componentDidMount(){
		fetch('/sign_up')
		.then(response=>response.json())
		.then((message)=>{
			if(message.state == "redirect"){
				this.props.changeHeader(false)
				this.redirectFun(true);
			}
		})
	}


	constructor(props) {
		super(props);
		this.state = {redirect:false};
		this.redirectFun = this.redirectFun.bind(this)
	}

	redirectFun(newState){
		console.log(12)
		this.props.changeHeader(newState)
		this.setState({redirect:newState});
	}


	render() {
		return (
			<Container style={{flex:"1 1 auto"}}>
				<Routes >
					<Route exact path="/" element={<TitleList></TitleList>}></Route >
					<Route exact path="/sing_in"  element={!this.state.redirect?<SignInList redirectFun={this.redirectFun} />:<Navigate to="/admin" />}></Route>
					<Route exact path="/sing_up" element={!this.state.redirect?<SignUpList  redirectFun={this.redirectFun} />:<Navigate to="/admin" />}></Route>
					<Route exact path="/admin" element={this.state.redirect?<AdminPage />:<Navigate to="/sing_in" />}></Route>
					<Route exact path="/log-out" element={<Navigate to="/sing_in" />}></Route>
					<Route path="*" element={<NotFound></NotFound>} ></Route>
				</Routes >
			</Container>
		)
	}
}