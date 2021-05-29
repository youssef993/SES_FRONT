import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Production',
    path: '/production',
    icon: <FaIcons.FaHammer />,
    cName: 'nav-text',
    property: false
  },
  {
    title: 'Ajout Of',
    path: '/ADDOf',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    property: null
  },
  {
    title: 'Ajout Compsants',
    path: '/addcomp',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    property: null
  },
  {
    title: 'List Produit',
    path: '/ListProduit',
    icon: <FaIcons.FaStackOverflow />,
    cName: 'nav-text',
    property: null
  },
  {
    title: 'Admin',
    path: '/Admin',
    icon: <FaIcons.FaCogs/>,
    cName: 'nav-text',
    property: null
  },
 
];