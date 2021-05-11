import React, { Component } from 'react';
import moment from 'moment';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class SuivieProd extends Component {
    constructor(props){
        super(props);
        this.state={
            produit:props.match.params.produit,
            of:props.match.params.of,
            id1: '',
            operation:'',
            ordre: '',
            touv:'',
            tfer:'',
            operations:[],
            composants:[]
        }
    }
    componentDidMount(){
        const token  = window.localStorage.getItem('token');
        const role  = window.localStorage.getItem('role');
        if (token != null && role!="user") {
            console.log("connected");                
            this.startProd();            
        } else {
            this.props.history.push('/authentification');
        }
    }
   
    startProd(){var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authenticated", window.localStorage.getItem('token'));
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          
          fetch("http://localhost:8070/app/Suivieproduction/"+this.state.produit+"/"+this.state.of, requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result);
                            var data= JSON.parse(result);
                           
                            this.setState({
                                operations: data
                            })
                                })
            .catch(error => console.log('error', error));
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">ORDRE</th>
                            <th scope="col">OPERATION</th>
                            <th scope="col">OPEN TIME</th>
                            <th scope="col">CLOSE TIME</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                                     
                            {
                                this.state.operations.map((op)=>{
                                    return <tr /*hidden={op.tfer? true:false}*/>
                                        <td>{op.ordre}</td>
                                        <td>{op.operation}</td>
                                        <td>{moment(op.touv).format("MMMM Do YYYY, h:mm:ss ")}</td>
                                        <td>{moment(op.tfer).format("MMMM Do YYYY, h:mm:ss ")}</td>
                                        

                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}


export default SuivieProd;