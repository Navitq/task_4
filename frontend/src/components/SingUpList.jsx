import React from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SingUpList() {
	
	return (

		<Container>
			<div class="h3 d-flex justify-content-center my-2 mb-3" style={{textAlign:"center"}}>
				Register now! Trial period is completely FREE!
			</div>
			<Form>
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" name="email" required/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Your Name</Form.Label>
					<Form.Control type="text" placeholder="Enter name" name="name" required/>
				</Form.Group>


				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" name="password" required/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>

	)
}
