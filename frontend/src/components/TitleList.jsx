import React from 'react'
import { NavLink } from "react-router-dom";


function TitleList() {
	return (
		<div >
			<div >
				A magical new way<br></br> to keep your data safe.
			</div>
			<div >
				Welcome to the next generation of cloud storages. It’s never been easier to keep your data safe. Expand your business with Homycloud
			</div>
			<NavLink to="/sing-up" >Try it for free</NavLink>
			<div >14-days free trial. No credit card required.</div>
		</div >
	)
}

export default TitleList