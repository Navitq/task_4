import React, {  useState, useEffect } from 'react'


import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SignUpList(props) {

	useEffect(() =>  {
		fetch('/sign_up')
		.then(response=>response.json())
		.then((message)=>{
			if(message.state == "redirect"){
				props.redirectFun(true);
				console.log(12223)
			}
		})

		 
	  });

	let [valueEmail, setValueEmail] = useState("");
	let [valuePassWord, setValuePassWord] = useState("");
	let [valueUserName, setValueUserName] = useState("");

	async function sendRequest(e){
		e.preventDefault();
		let response = await fetch('sign_up', {
			method:"post",
			body: new FormData(e.currentTarget)
		});
		console.log(response)
		let message = await response.json();
		console.log(message)
		if(message.state == "redirect"){
			props.redirectFun(true);
		} 
	}

	
	return (

		<Container>
			<div className="h3 d-flex justify-content-center my-2 mb-3" style={{textAlign:"center"}}>
				Register now! Trial period is completely FREE!
			</div>
			<Form onSubmit={(e)=>{sendRequest(e)}}>
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" name="email" value={valueEmail} onChange={(e)=>{setValueEmail(e.target.value)}} required/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Your Name</Form.Label>
					<Form.Control type="text" placeholder="Enter name" name="name" value={valueUserName} onChange={(e)=>{setValueUserName(e.target.value)}} required/>
				</Form.Group>


				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" name="password" value={valuePassWord} onChange={(e)=>{setValuePassWord(e.target.value)}} required/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>

	)
}
