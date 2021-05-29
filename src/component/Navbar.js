import React, { Component, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/fa';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const deconnect=() => {window.localStorage.clear(); document.location.reload();}

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <img src="/logo.png" style={{height:'44px', position:"absolute", marginLeft: '65px',marginBottom:'-7px'}}></img>
          <h1 style={{color: 'aliceblue',marginLeft: '755px',marginRight: '15px'}}>  SIAME PRODUCT</h1>
          <button type="button" class="btn btn-danger"  onClick={deconnect}><IoIcons.FaPowerOff style={{fontSize: '25px'}}/><Link to="/authentification" style={{color: 'aquamarine'}}>Déconnexion</Link></button>
        </div>
        <nav hidden={props.role} className={sidebar ? 'nav-menu active' : 'nav-menu'}style={{zIndex: '1'}} >
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li hidden={(item.property == null)? window.localStorage.getItem('role')=== 'user': item.property } key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;