import React, { useEffect } from 'react'
import SiteHeader from "./SiteHeader"
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Container} from 'react-bootstrap';

import SiteMainContent from "./SiteMainContent"
import Footer from "./Footer"

export default function MainPage() {
    return(
        <Container  style={{minHeight:"100%", display:"flex", flexDirection:"column"}}>
            <BrowserRouter >
                <SiteHeader ></SiteHeader>
                <SiteMainContent></SiteMainContent>
                <Footer></Footer>
            </BrowserRouter> 
        </Container>
    )
}
