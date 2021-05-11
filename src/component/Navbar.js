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
          <h1 style={{color: 'aliceblue',marginLeft: '420px'}}>  SIAME PRODUCT</h1>
          <button type="button" class="btn btn-danger" style={{ marginLeft: '360px'}} onClick={deconnect}><IoIcons.FaPowerOff style={{fontSize: '25px'}}/><Link to="/authentification" style={{color: 'aquamarine'}}>Déconnexion</Link></button>
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
                <li  key={index} className={item.cName}>
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