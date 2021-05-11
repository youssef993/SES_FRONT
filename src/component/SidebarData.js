import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'PRODUCTION',
    path: '/production',
    icon: <FaIcons.FaHammer />,
    cName: 'nav-text'
  },
  {
    title: 'Ajout Of',
    path: '/ADDOf',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Ajout Compsants',
    path: '/addcomp',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'List Produit',
    path: '/ListProduit',
    icon: <FaIcons.FaStackOverflow />,
    cName: 'nav-text'
  },
 
];