import React, {  useState, useEffect, useRef } from 'react'
import { Container, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

export default function StoragePageLinks(props) {

    let [tableCnt,setTableCnt] = useState(null)
    let [checkboxes, setCheckboxes] = useState(false);
    let checkboxesRef = useRef([]);

    function handleCheckboxChange(e){
        for(let i =0;i < checkboxesRef.current.length;++i){
            checkboxesRef.current[i].checked = !checkboxes;
        }
        setCheckboxes(!checkboxes)
    }

    async function sendData(e){
        let emails = checkboxesRef.current.filter((value)=>{
            if(value.checked){
                return value.name;
            }
        })
        let emailsParsed = emails.map((val)=>{return val.name})
        let data = JSON.stringify(emailsParsed)


        await fetch("/admin",{
            method: e.target.dataset.method,
            headers: new Headers({'content-type': 'application/json'}),

            body: data
        })
        window.location.reload();
    }

    useEffect(()=>{
        fetch("/admin")
        .then(response=>response.json())
        .then((mes)=>{
            let checkboxName = {};
            let table = mes.map((el)=>{
                let uid = uuidv4();
                let row = <tr key={uuidv4()}>
                    <td className='d-flex justify-content-center' >
                        <Form.Check type="switch" name={el.email} ref={ref => checkboxesRef.current.push(ref) }  />
                    </td>
                    <td>{el.id}</td>
                    <td >{el.email}</td>
                    <td>{el.name}</td>
                    <td>{el.regdate}</td>
                    <td>{el.lastvisit}</td>
                    <td>{el.status}</td>
                </tr>
                checkboxName[`${el.email}`] = false;
                return row;
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
                        <Button variant="secondary" onClick={sendData} data-method="PUT">Block</Button>
                        <Button variant="secondary" onClick={sendData} data-method="PATCH">Unblock</Button>
                        <Button variant="secondary" onClick={sendData} data-method="DELETE">Delete</Button>
                    </ButtonGroup>
                </Container>
                <Container  className='overflow-auto'>
                    <Table striped bordered hover style={{textAlign:"center"}}>
                        <thead>
                            <tr >
                                <th className='d-flex justify-content-center'>
                                    <Form.Check type="switch" name="main-switcher" id="main-switcher" checked={checkboxes}  onChange={handleCheckboxChange}/>
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