import React, {  useEffect, useState } from 'react'
import SiteHeader from "./SiteHeader"
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Container} from 'react-bootstrap';

import SiteMainContent from "./SiteMainContent"
import Footer from "./Footer"

export default function MainPage() {
    let [headerState, setHeaderState] = useState(false);
    useEffect(() => {
        fetch("/sign_up").then(res=>res.json()).then((mes)=>{if(mes.state=="redirect")changeHeader(true)})
      }, []);
    function changeHeader(state){
        setHeaderState(()=>{return state})
        console.log(headerState)
    }
    return(
        <Container  style={{minHeight:"100%", display:"flex", flexDirection:"column"}}>
            <BrowserRouter >
                <SiteHeader changeHeader={(state)=>{changeHeader(state)}} headerState={headerState}></SiteHeader>
                <SiteMainContent changeHeader={(state)=>{changeHeader(state)}} headerState={headerState}></SiteMainContent>
                <Footer></Footer>
            </BrowserRouter> 
        </Container>
    )
}
