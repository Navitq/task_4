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
			}
		})
	}



	render() {
		return (
			<Container style={{flex:"1 1 auto"}}>
				<Routes >
					<Route exact path="/" element={<TitleList></TitleList>}></Route >
					<Route exact path="/sing_in"  element={!this.props.headerState?<SignInList redirectFun={this.props.changeHeader} />:<Navigate to="/admin" />}></Route>
					<Route exact path="/sing_up" element={!this.props.headerState?<SignUpList  redirectFun={this.props.changeHeader} />:<Navigate to="/admin" />}></Route>
					<Route exact path="/admin" element={this.props.headerState?<AdminPage />:<Navigate to="/sing_in" />}></Route>
					<Route path="*" element={<NotFound></NotFound>} ></Route>
				</Routes >
			</Container>
		)
	}
}