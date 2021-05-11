import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class OperationProd extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.match.params.id,
            imagepath: '',
            operation: '',
            ordre:'',
            produit:'',
            of:''        }
    }
    componentDidMount(){
        const token  = window.localStorage.getItem('token');

        if (token != null) {
            console.log("connected");
            this.getOp();
        } else {
            this.props.history.push('/authentification');
        }
    }
    endOP(){var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authenticated", window.localStorage.getItem('token'));
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
          };
          
          fetch("http://localhost:8070/app/productionOperation/"+this.state.id, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    getOp(){var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authenticated", window.localStorage.getItem('token'));
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          
          fetch("http://localhost:8070/app/productionOperation/"+this.state.id, requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result);
                                var data= JSON.parse(result);
                                console.log(data);
                               
                                this.setState({
                                    imagepath: data.imagepath,
                                    operation: data.operation,
                                    ordre:data.ordre,
                                    produit:data.produit,
                                    of:data.of
                                })
                                console.log("op:"+this.state.imagepath);
                            })
            .catch(error => console.log('error', error));
    }
    render() {
        return (
            <div className="container">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>OPERATION N°: {this.state.ordre}</th>
                            <th>{this.state.operation}</th>
                            <th>ORDRE N°: {this.state.of}</th>
                            <th> <a  class="btn btn-info" onClick={()=>this.endOP()}><Link to={"/production/"+this.state.produit+"/"+this.state.of} style={{color: 'aquamarine'}}><FaIcons.FaCheckCircle  style={{fontSize: '25px'}}/> VALIDER OPERATION</Link></a></th>
                        </tr>
                    </thead>
                </table>
                <div className="row justify-content-md-center">
                
                    <img src={"/"+this.state.imagepath} class="card-img-top" alt="..." style={{height: '420px',width: 'auto'}}/>
                        
                
                </div>
            </div>
        );
    }
}

export default OperationProd;