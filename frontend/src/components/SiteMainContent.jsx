import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import TitleList from "./TitleList"
import SingInList from "./SingInList"
import SingUpList from "./SingUpList"
import NotFound from "./NotFound"

export default class SiteMainContent extends Component {
	render() {
		return (
			<Routes >
				<Route exact path="/" element={<TitleList></TitleList>}></Route >
				<Route exact path="/sing-in" element={<SingInList />}></Route>
				<Route exact path="/sing-up" element={<SingUpList />}></Route>
				<Route exact path="/admin" element={<Navigate to="/not-founded" />}></Route>
				<Route exact path="/log-out" element={<Navigate to="/sing-in" />}></Route>
				<Route path="*" element={<NotFound></NotFound>} ></Route>
			</Routes >
		)
	}
}