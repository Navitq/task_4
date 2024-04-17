import React, {  useState } from 'react'
import SiteHeader from "./SiteHeader"
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Container} from 'react-bootstrap';

import SiteMainContent from "./SiteMainContent"
import Footer from "./Footer"

export default function MainPage() {
    let [headerState, setHeaderState] = useState(false);
    function changeHeader(state){
        console.log("1231",state)
        setHeaderState(()=>{return state})
        console.log(headerState)
    }
    return(
        <Container  style={{minHeight:"100%", display:"flex", flexDirection:"column"}}>
            <BrowserRouter >
                <SiteHeader changeHeader={headerState}></SiteHeader>
                <SiteMainContent changeHeader={(state)=>{changeHeader(state)}}></SiteMainContent>
                <Footer></Footer>
            </BrowserRouter> 
        </Container>
    )
}
