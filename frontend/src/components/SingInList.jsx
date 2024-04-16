import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export class SingInList extends Component {
	render() {
		return (
			<Container>
				<div class="h3 d-flex justify-content-center my-2 mb-3" style={{textAlign:"center"}}>
					Glad to see you again! Log in!
				</div>
				<Form>
					<Form.Group className="mb-3" controlId="email">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" name="email" required/>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" name="password" required/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Container>
				);
			}
}



export default SingInList;