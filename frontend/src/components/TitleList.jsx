import React from 'react'
import { Container, Accordion,  Image, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';



function TitleList() {
	return (
		
		<Container>
			<div class="h3 d-flex justify-content-center my-2 mb-3" style={{textAlign:"center"}}>
				A magical new way to manage your audience
			</div>

			<Accordion defaultActiveKey="0" className='my-4'>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Audience manager №1</Accordion.Header>
					<Accordion.Body>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>


			<Carousel>
				<Carousel.Item >
					<Image src="./img/1.jpg" text="First slide" style={{maxHeight:"700px"}}/>
					<Carousel.Caption >
					<h3>First slide label</h3>
					<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item >
					<Image src="./img/1.jpg" text="Second slide"  style={{maxHeight:"700px"}}/>
					<Carousel.Caption>
					<h3>Second slide label</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<Image src="./img/1.jpg" text="Third slide"  style={{maxHeight:"700px"}}/>

					<Carousel.Caption>
					<h3>Third slide label</h3>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl consectetur.
					</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>

			
			<Container className='d-flex justify-content-center mt-4'>
				<Button variant="primary" size="lg" active width="fit-content">
					<NavLink className="nav-link" to="/sing-up" >Try it for free</NavLink>
				</Button>
			</Container>
		</Container>
	)
}

export default TitleList