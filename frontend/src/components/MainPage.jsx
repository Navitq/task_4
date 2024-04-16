import React, { useEffect } from 'react'
import SiteHeader from "./SiteHeader"
import { BrowserRouter } from "react-router-dom";
import SiteMainContent from "./SiteMainContent"
import 'bootstrap/dist/css/bootstrap.css';


export default function MainPage() {
    return(
        <>
            <BrowserRouter >
                <SiteHeader ></SiteHeader>
                <SiteMainContent></SiteMainContent>
            </BrowserRouter> 
        </>
    )
}
