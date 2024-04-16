import React from 'react'
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';



export default function StoragePageLinks(props) {

   return (
      <>
         <Nav.Item>
            <NavLink to="/admin"  className="nav-link">Admin</NavLink>
         </Nav.Item>
         <Nav.Item>
            <NavLink to="/not-founded" className="nav-link">Log Out</NavLink>
         </Nav.Item>


         
      </>
   )
}
