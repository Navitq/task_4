import React, { Component } from 'react'
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export class Footer extends Component {
	render() {
		return (
            <Container >
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div class="col-md-4 d-flex align-items-center">
                        <Link href="https://github.com/Navitq/task_4" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                            <Image src="./img/GitHub_Logo.png" height="30"/>
                        </Link>
                        <span class="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Company, Inc</span>
                    </div>

                    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li class="ms-3"><Link class="text-body-secondary" href="https://github.com/Navitq/task_4"><Image src="./img/facebook.svg" height="30"/></Link></li>
                        <li class="ms-3"><Link class="text-body-secondary" href="https://github.com/Navitq/task_4"><Image src="./img/insta.svg" height="30"/></Link></li>
                        <li class="ms-3"><Link class="text-body-secondary" href="https://github.com/Navitq/task_4"><Image src="./img/twitter.svg" height="30"/></Link></li>
                    </ul>
                </footer>
            </Container>
				);
			}
}

export default Footer;