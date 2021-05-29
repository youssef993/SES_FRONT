import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io5';

class Operation extends Component {
    constructor(props){
        super(props);
        this.state={
            operation: props.operation,
            produit: props.produit,
            load: props.load,
            id: props.id,
            ordre: props.ordre,
            img:"/"+props.img,
            newoperation:'',
            newordre:'',
            vue:true

        }
    }
    /******************************* */
    componentDidMount(){
        console.log(this.state.load);
    }
    /*************************** */
    
    /**************************** */
    updateVue(){
        
        this.setState({
            vue: !this.state.vue
        })
    }
    operation(e){
        this.setState({
            newoperation: e.target.value
       })
             }
/******************** */
ordre(e){
this.setState({
newordre: e.target.value
            })
}
/************************* */
imagepath(e){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authenticated", window.localStorage.getItem('token'));
var formdata = new FormData();
var file = e.target.files;
console.log(file);
formdata.append("operationImg", file[0], file[0].name);

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: formdata,
redirect: 'follow'
};

fetch("http://localhost:8070/app/app/upload/"+ this.state.produit+this.state.newoperation+this.state.newordre, requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
}
deleteOp(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authenticated", window.localStorage.getItem('token'));
    var requestOptions = {
      method: 'Delete',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8070/app/deleteop/"+this.state.id, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        window.location.reload();}
  
  )
      .catch(error => console.log('error', error));
  }

updateOp()
   { var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authenticated", window.localStorage.getItem('token'));

var raw = JSON.stringify({"id":this.state.id,"operation":this.state.newoperation,"imagepath":this.state.produit+ this.state.newoperation+ this.state.newordre,"ordre":this.state.newordre});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8070/app/modfop", requestOptions)
  .then(response => response.text())
  .then(result => {
      console.log(result);
      window.location.reload();}

)
  .catch(error => console.log('error', error));
}
    render() {
        return (
            <div>
                
                  <div class="card" style={{width: '45rem'}}>
                    <img src={this.state.img} class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">{this.state.ordre}:{this.state.operation}</h5>
                        <a hidden={!this.state.vue}  class="btn btn-warning" onClick={()=>this.updateVue()}><FaIcons.FaHammer  style={{fontSize: '25px'}}/> UPDATE</a>
                        <a hidden={!this.state.vue}  class="btn btn-danger" onClick={()=>this.deleteOp()}><IoIcons.IoTrash  style={{fontSize: '25px'}}/> DELETE</a>
                        <div hidden={this.state.vue}>
                        <div className="container">
                            <div className="row ">
                                    <div class="input-group col-8">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" style={{height: '45px'}}>OPERATION:</span>
                                    </div>
                                    <textarea class="form-control" style={{height: '45px'}} aria-label="operation" value={this.state.newoperation} onChange={(e)=>{this.operation(e)}}></textarea>
                                    </div>
                                    <div class="input-group col-4">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" style={{height: '45px'}}>ORDER:</span>
                                        </div>
                                        <textarea class="form-control" style={{height: '45px'}} aria-label="ordre"  value={this.state.newordre} onChange={(e)=>{this.ordre(e)}} ></textarea>
                                    </div>
                            </div>
                        </div>
                        <div className='col-12' style={{height:'10px'}}></div>
                        <div className='col-8' >
                            <input type="file" id="file" value={this.state.imagepath} onChange={(e)=>{this.imagepath(e)}} ></input>
                            <button className="btn btn-primary" onClick={()=>{this.updateOp()}}><FaIcons.FaHammer  style={{fontSize: '25px'}}/>UPDATE</button>
                        
                        </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Operation;