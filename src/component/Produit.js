import React, { Component } from 'react';
import ListProduit from '../pages/ListProduit';
import Operation from './Operation';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io5';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Produit extends Component {

    constructor(props){
        super(props);
        this.state={
            produit: props.produit,
            id: props.id,
            link: "/ListOperation/"+props.produit,
            operation: []
        }
    }
    componentDidMount(){
    }
    deleteprod(){var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authenticated", window.localStorage.getItem('token'));
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
          };
          
          fetch("http://localhost:8070/app/app/deleteprod/"+this.state.id, requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result);
                    window.location.reload();
            })
            .catch(error => console.log('error', error));
    }
   




    render() {
        return (
            
                <tr>
                <td>
                 produit: {this.state.produit}
                </td>
                <td>
                <button type="button" class="btn btn-info"><FaIcons.FaSistrix style={{fontSize: '25px'}}/><Link to={this.state.link} style={{color: 'aquamarine'}}>OPERATION</Link></button>
                <button type="button"  class="btn btn-danger" onClick={()=>this.deleteprod()}style={{marginLeft:'6px'}}><IoIcons.IoTrash  style={{fontSize: '25px'}}/> DELETE</button>
                </td>
                </tr>
            
        );
    }
}

export default Produit;