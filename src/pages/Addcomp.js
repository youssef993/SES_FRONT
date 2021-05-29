import React, { Component } from 'react';
import * as IoIcons from 'react-icons/hi';

class Addcomp extends Component {
    constructor(props){
        super(props);
        this.state={
            id1:'',
            article:''
        }
    }
    componentDidMount(){
        const token  = window.localStorage.getItem('token');
        const role  = window.localStorage.getItem('role');

        if (token != null && (role== "admin"||role=="magazinier")) {
            console.log("connected");
        } else {
            this.props.history.push('/authentification');
            window.localStorage.clear();
        }
        
    }
    article(e){
        this.setState({
            article: e.target.value
        })
    }
    id1(e){
        this.setState({
            id1: e.target.value
        })
    }
    newcomp(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authenticated", window.localStorage.getItem('token'));

var raw = JSON.stringify({"article":this.state.article,"ID1": this.state.id1});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8070/app/ajout", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    }
    render() {
        return (
            
            <div className="container" style={{textAlign: 'center'}}>
                <br></br>
                <div className="row justify-content-md-center">
                <div className="col-sm-7">
                <h1>AJOUT COMPOSANTS:</h1>
                </div>
                <div className="col-sm-7">
                <input type="text" placeholder="article" value={this.state.article} onChange={(e)=>{this.article(e)}} />
                <input type="text" placeholder="SN" value={this.state.id1} onChange={(e)=>{this.id1(e)}} ></input>
                <div className="col-sm-7" style={{height: '10px'}}></div></div>
                <div>
                <button type="button" class="btn btn-success" onClick={()=>{this.newcomp()}}><IoIcons.HiViewGridAdd style={{fontSize: '25px'}}/> Ajout Composant</button>
                </div>
            </div>
            </div>
        );
    }
}

export default Addcomp;