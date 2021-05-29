import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io5';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            username: props.username,
            password: props.password,
            role: props.role,
            id: props.id,
            newuseername:'',
            newpwd:'',
            confnewpwd:'',
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

deleteOp(){
    var myHeaders = new Headers();
myHeaders.append("authenticated", "60a82ccb8d5f236775c4977c");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:8070/app/deleteUser/"+this.state.id, requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result);
    window.location.reload();})
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
                <div style={{height:'40px'}}></div>
            <div className="col-4">
                
                  <div class="card" style={{width: '17rem'}}>
                    <img src="/profile-img.jpg" class="card-img-top imgcard" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">{this.state.username}:{this.state.role}</h5>
                        <a hidden={!this.state.vue}  class="btn btn-warning" onClick={()=>this.updateVue()}><FaIcons.FaHammer  style={{fontSize: '25px'}}/> UPDATE</a>
                        <a hidden={!this.state.vue}  class="btn btn-danger" onClick={()=>this.deleteOp()}   style={{marginLeft:'11px'}} ><IoIcons.IoTrash  style={{fontSize: '25px'}}/> DELETE</a>
                        <div hidden={this.state.vue}>
                        <div className="container">
                            <div className="row ">
                            <div class="input-group">
                                        
                                        <textarea class="form-control" style={{height: '45px'}} aria-label="username" placeholder="UserName"  value={this.state.username} onChange={(e)=>{this.newUser(e)}} ></textarea>
                                    </div>
                                    <div class="input-group">
                                    <textarea class="form-control" style={{height: '45px'}} placeholder="password" aria-label="Password" value={this.state.newpwd} onChange={(e)=>{this.operation(e)}}></textarea>
                                    </div>
                                    
                                    <div class="input-group">
                                        
                                        <textarea class="form-control" style={{height: '45px'}} aria-label="confirm Password" placeholder="confirm password"  value={this.state.newordre} onChange={(e)=>{this.ordre(e)}} ></textarea>
                                    </div>
                            </div>
                        </div>
                        
                            <button className="btn btn-primary" onClick={()=>{this.updateOp()}}><FaIcons.FaHammer  style={{fontSize: '25px'}}/>UPDATE</button>
                        
                    </div>
                </div>
                
                </div></div> </div>
        );
    }
}

export default Profile;