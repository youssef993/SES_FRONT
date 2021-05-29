import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Production extends Component {
    constructor(props){
        super(props);
        this.state={
            produit:'',
            of:'',
            afficheBtnSuivie:true
        }
    }
    componentDidMount(){
        const token  = window.localStorage.getItem('token');
        const role  = window.localStorage.getItem('role');
        if (token != null) {
            console.log("connected");
            if(role!="user"){
                this.setState({afficheBtnSuivie: false})
            }
        } else {
            this.props.history.push('/authentification');
        }
        
    }
    newProd(e){
        this.setState({
            produit: e.target.value
        })
    }
    newOf(e){
        this.setState({
            of: e.target.value
        })
    }
    startProd(){var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authenticated", window.localStorage.getItem('token'));
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          
          fetch("http://localhost:8070/app/production/"+this.state.produit+"/"+this.state.of, requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result);
                            
                            })
            .catch(error => console.log('error', error));
    }
    render() {
        return (
            <div className="container">
                <br/>
                <div className="row justify-content-center" style={{textAlign: 'center'}}> 
                <div className="col-4">
                    <div className="input-group">
                        <div className="input-group-prepend ">
                            <span className="input-group-text" style={{height: '45px'}}>PRODUIT:</span>
                        </div>
                        <textarea className="form-control" style={{height: '45px'}} aria-label="operation" value={this.state.produit} onChange={(e)=>{this.newProd(e)}}></textarea>
                    </div>
                    <div className="col-4" style={{height:'10px'}}></div>
                    <div className="input-group col-4">       
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{height: '45px'}}>ORDER:</span>
                        </div>
                        <textarea className="form-control" style={{height: '45px'}} aria-label="ordre"  value={this.state.of} onChange={(e)=>{this.newOf(e)}} ></textarea>
                    </div>
                    <div  className="row justify-content-center" style={{height:'10px'}}></div>
                    <button className="btn btn-primary" onClick={()=>{this.startProd()}}><FaIcons.FaHammer  style={{fontSize: '25px'}}/><Link to={"/production/"+this.state.produit+"/"+this.state.of} style={{color: 'aquamarine'}}>Démarrer la production</Link></button> 
                    <div  className="row justify-content-center" style={{height:'10px'}}></div>
                    <button className="btn btn-primary" hidden={this.state.afficheBtnSuivie} onClick={()=>{this.startProd()}}><FaIcons.FaSearch  style={{fontSize: '25px'}}/><Link to={"/SuivieProduction/"+this.state.produit+"/"+this.state.of} style={{color: 'aquamarine'}}>SUIVIE PRODUCTION</Link></button> 
                </div>
             </div></div>
        );
    }
}

export default Production;