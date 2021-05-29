import React, { Component } from 'react';
import Of from '../component/Of';
import * as IoIcons from 'react-icons/hi';

class Addof extends Component {
    constructor(props){
        super(props);
        this.state={
            of:'',
            produit:'',
            encours:[]
        }
        this.getEncours = this.getEncours.bind(this);
    }
    componentDidMount(){
       
        const token  = window.localStorage.getItem('token');
        const role  = window.localStorage.getItem('role');
        
        if (token != null && (role!="user")) {
            console.log("connected");
            this.getEncours();
        } else {
            this.props.history.push('/authentification');
            window.localStorage.clear();

        }
        
    }
    produit(e){
        this.setState({
            produit: e.target.value
        })

    }
    of(e){
        this.setState({
            of: e.target.value
        })
    }
    getEncours(){
        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authenticated", window.localStorage.getItem('token'));
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          
          fetch("http://localhost:8070/app/encours", requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result)
                var data= JSON.parse(result);
                this.setState({
                    encours: data
                })})
            .catch(error => console.log('error', error));
    }
    newOf(){
        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authenticated", window.localStorage.getItem('token'));

var raw = JSON.stringify({"produit":this.state.produit,"ordreDeFabrication":this.state.of});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
fetch("http://localhost:8070/app/addprod", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result);
                this.getEncours();
                
                   })
  .catch(error => console.log('error', error));
    }
    render() {
        return (
            <div>
               <div style={{height:'50px'}}></div> 
            <div class="container"> 
                <br/>
                <div className="row justify-content-md-center">
                    <div className='col-8'>
                    <input type="text" placeholder="nom produit" value={this.state.produit} onChange={(e)=>{this.produit(e)}} />
                    <input type="text" placeholder="Of" value={this.state.of} onChange={(e)=>{this.of(e)}} ></input>
                    <button type="button" className="btn btn-success" onClick={()=>{this.newOf()}} style={{marginLeft:'7px'}}><IoIcons.HiViewGridAdd style={{fontSize: '25px'}}/> Add OF</button>
                </div><div style={{height:'40px'}}></div>
                <br></br>
                <div className="row">
                {
                    this.state.encours.map((of)=>{
                        console.log(of);
                        return <Of produit={of.produit} orderf={of.ordreDeFabrication} composants={of.composants} id={of._id} getall={this.getEncours} />
                    })
                }
            
                </div></div>
            </div>
            <div></div></div>
        );
    }
}

export default Addof;