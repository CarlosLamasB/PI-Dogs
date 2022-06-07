import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'
const Navbar = ()=>{
return(
  <div className='Nabu'>
   
  
<NavLink to='/Home' className='second first' exact ><p className="nav">Home</p></NavLink>
<NavLink to='/Form' className='second last' exact activeClassName='second-active'><p className="nav">Form</p></NavLink>
 
 
 </div>



  )
}
export default Navbar