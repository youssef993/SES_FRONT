import React, { Component } from 'react';
import * as IoIcons from 'react-icons/fa';
import Profile from '../component/profile';
class Admin extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            userName:'',
            password:'',
            confirmPassword:'',
            role:'user',
            alert: true,
            alerts: true
        }
    }
    componentDidMount(){
        
        const token  = window.localStorage.getItem('token');
        const role  = window.localStorage.getItem('role');
        
        if (token != null && (role!="user" && role!="magazinier" )) {
            console.log("connected");
            this.getUsers();
        } else {
            this.props.history.push('/authentification');
            window.localStorage.clear();

        }
        
    }
    roleChange(event){
        this.setState({role: event.target.value, alert:true });
        console.log(event.target.value);
    }
    newUsername(e){
        this.setState({userName: e.target.value, alert: true});
    }
    newPassword(e){
        this.setState({password: e.target.value, alert: true,
                            });
    }
    newCPassword(e){
        this.setState({confirmPassword: e.target.value, alert: true});
    }
    getUsers(){
        var myHeaders = new Headers();
myHeaders.append("authenticated", window.localStorage.getItem('token'));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:8070/app/listuser", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result)
var data= JSON.parse(result);
this.setState({users:data})
})
  .catch(error => console.log('error', error));
    }
    addUser(){
        var myHeaders = new Headers();
myHeaders.append("authenticated", window.localStorage.getItem('token'));
myHeaders.append("Content-Type", "application/json");

if(this.state.password!= this.state.confirmPassword){
    this.setState({alert: false});
}else{
    var raw = JSON.stringify({"email":this.state.userName,"password":this.state.password,"role":this.state.role});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8070/app/users", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result)
                    var data = JSON.parse(result);
                    if(data.success){
                        this.setState({
                            username:'',
                            password:'',
                            confirmPassword:'',
                            role:'user',
                            alerts: false
                        })
                    }
})
  .catch(error => console.log('error', error));
}
    }
    render() {
        return (
            <div>
                <div style={{height:'40px'}}></div>
            <div className="container">
                <div  className="row justify-content-center" style={{height:'10px'}}></div>
                <div className="row justify-content-center">
                <div className="col-7 " style={{textAlign: "center"}}>
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">@UserName</span>
                </div>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"value={this.state.username} onChange={(e)=>this.newUsername(e)}></input>
                </div>
                </div>
                    <div  className="row justify-content-center" style={{height:'35px'}}></div>
                <div className="col-7"style={{textAlign: "center"}}>
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">@Password</span>
                </div>
                <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"value={this.state.password} onChange={(e)=>this.newPassword(e)}></input>
                </div>
                </div>    <div  className="row justify-content-center" style={{height:'35px'}}></div>
                
                <div className="col-7"style={{textAlign: "center"}}>
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">@Confirm Password</span>
                </div>
                <input type="password" class="form-control" placeholder="Confirm Password" aria-label="Username" aria-describedby="basic-addon1"value={this.state.confirmPassword} onChange={(e)=>this.newCPassword(e)}></input>
                </div>
                    <div class="alert alert-danger" role="alert" hidden={this.state.alert}> Password Didn't Match!!!!</div>
                    </div> <div  className="row justify-content-center" style={{height:'35px'}}></div>
                   
                <div className="col-7"style={{textAlign: "center"}}>
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">@User Role</span>
                </div>
                    <select class="form-control" value={this.state.role} onChange={(e)=>this.roleChange(e)}>
                        <option value="user">USER</option>
                        <option value="magazinier">SUPPLY</option>
                        <option value="technique">Methode</option>
                        <option value="admin">ADMINISTRATEUR</option>
                    </select>
                    </div>
                </div>

                    <div  className="row justify-content-center" style={{height:'35px'}}></div>
                    
                <div className="col-7"style={{textAlign: "center"}}>
                    <button type="button" className="btn btn-success" onClick={()=>{this.addUser()}}><IoIcons.FaUserPlus style={{fontSize: '25px'}}/>Add USERS</button>
                    <div class="alert alert-success" role="alert" hidden={this.state.alerts}> Successfully ADDED!!!</div>
                    </div>

                    </div>
                    <div className="container"><div className="row">
                    {
                        this.state.users.map((user)=>{
                            return <Profile id= {user._id} username={user.email} password={user.password} role={user.role} />
                        })

                    }
                    </div></div>

            
                </div> </div>
                
                
           
        );
    }
}

export default Admin;