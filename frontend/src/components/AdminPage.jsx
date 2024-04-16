import { Container, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

export default function StoragePageLinks(props) {

    return (
        <>
            <Container>
				<div class="h3 d-flex justify-content-center my-2 mb-3" style={{textAlign:"center"}}>
					Table with info about our users!
				</div>
                <Container className='d-flex justify-content-center mb-3'>
                    <ButtonGroup aria-label="Toolbar">
                        <Button variant="secondary">Block</Button>
                        <Button variant="secondary">Unblock</Button>
                        <Button variant="secondary">Delete</Button>
                    </ButtonGroup>
                </Container>
                <Table striped bordered hover style={{textAlign:"center"}}>
                    <thead>
                        <tr >
                            <th className='d-flex justify-content-center'>
                                <Form.Check type="switch" id="custom-switch"/>
                            </th>
                            <th >id</th>
                            <th>E-mail</th>
                            <th>Name</th>
                            <th>Reg. date</th>
                            <th>Last log in</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td className='d-flex justify-content-center'>
                                <Form.Check type="switch" id="custom-switch"/>
                            </td>
                            <td>id</td>
                            <td>E-mail</td>
                            <td>Name</td>
                            <td>Reg. date</td>
                            <td>Last log in</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}