import React, {  useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

export default function StoragePageLinks(props) {

    let [tableCnt,setTableCnt] = useState(null)

    useEffect(()=>{
        fetch("/admin")
        .then(response=>response.json())
        .then((mes)=>{
            console.log(mes)
            let table = mes.map((el)=>{
                let idCheckbox = uuidv4();
                return <tr key={uuidv4()}>
                    <td className='d-flex justify-content-center' >
                        <Form.Check type="switch" id={uuidv4()} data-id={idCheckbox}/>
                    </td>
                    <td>{el.id}</td>
                    <td id={idCheckbox}>{el.email}</td>
                    <td>{el.name}</td>
                    <td>{el.regdate}</td>
                    <td>{el.lastvisit}</td>
                    <td>{el.status}</td>
                </tr>
            })
            setTableCnt(table)
        })
    },[])

    return (
        <>
            <Container style={{overflow:"auto"}}>
				<div className="h3 d-flex justify-content-center my-2 mb-3" style={{textAlign:"center"}}>
					Table with info about our users!
				</div>
                <Container className='d-flex justify-content-center mb-3'>
                    <ButtonGroup aria-label="Toolbar">
                        <Button variant="secondary">Block</Button>
                        <Button variant="secondary">Unblock</Button>
                        <Button variant="secondary">Delete</Button>
                    </ButtonGroup>
                </Container>
                <Container  className='overflow-auto'>
                    <Table striped bordered hover style={{textAlign:"center"}}>
                        <thead>
                            <tr >
                                <th className='d-flex justify-content-center'>
                                    <Form.Check type="switch" id="main-switcher"/>
                                </th>
                                <th >id</th>
                                <th>E-mail</th>
                                <th>Name</th>
                                <th>Reg. date</th>
                                <th>Last log in</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody >
                            {tableCnt}
                        </tbody>
                    </Table>
                </Container>
            </Container>
        </>
    )
}