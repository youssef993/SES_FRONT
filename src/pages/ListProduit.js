import React, { Component } from 'react';
import Produit from '../component/Produit';
import * as IoIcons from 'react-icons/md';

class ListProduit extends Component {
    constructor(props){
        super(props);
        this.state={
           produit: '',
           listProduit:[]
    }
    }
    
    
    componentDidMount(){
        const token  = window.localStorage.getItem('token');
        const role  = window.localStorage.getItem('role');
  
        if (token != null && (role== "admin"||role=="technique")) {
            console.log("connected");
            this.getListProduit();
        } else {
            this.props.history.push('/authentification');
        }
       
    }
    produit(e){
        this.setState({
            produit: e.target.value
        })
      }
      getListProduit(){var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authenticated", window.localStorage.getItem('token'));
        var raw = "";

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8070/app/listproduit", requestOptions)
          .then(response => response.text())
          .then(result => {console.log(result)
          var data= JSON.parse(result);
          console.log(data);
                this.setState({
                    listProduit: data
                })
          })
          .catch(error => console.log('error', error));

      }
     
    newpr(){var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authenticated", window.localStorage.getItem('token'));

      var raw = JSON.stringify({"produit":this.state.produit});

     var requestOptions = {
      method: 'POST',
        headers: myHeaders,
         body: raw,
          redirect: 'follow'
         };

    fetch("http://localhost:8070/app/produitor", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result);
this.getListProduit();
this.setState({
    produit:''
})})
  .catch(error => console.log('error', error));
        }   
    render() {
        return (

                <div className="container" style={{textAlign: 'center'}}>
                    <br></br>
                    <div className="row justify-content-md-center">
                        <div className='col-4'>
                <input type="text" placeholder="produit" value={this.state.produit} onChange={(e)=>{this.produit(e)}} />
                
                <button type="button" class="btn btn-success" onClick={()=>{this.newpr()}}style={{marginLeft:'7px'}}><IoIcons.MdControlPoint style={{fontSize: '25px'}}/> Add Produit</button>
                </div>
                </div>
                <div  className="row justify-content-center" style={{height:'25px'}}></div>
                <div className="row justify-content-md-center">   
                <div className='col-8'>
                <table class="table table-hover">
                    <thead>
                        <th scope="col">PRODUIT</th>
                        <th scope="col">OPERATION</th>
                    </thead> 
                    <tbody>
                {
                this.state.listProduit.map((prod)=>{
                    return <Produit produit={prod.produit} id={prod._id} />
                })
                }
                </tbody>
                </table>
                </div></div>
            </div>
        );
       }
}

export default ListProduit;