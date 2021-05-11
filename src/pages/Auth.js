import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
class Auth extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }
    newUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    newPassword(e){
        this.setState({
            password: e.target.value
        })
    }
    login(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"email":this.state.username,"password":this.state.password});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8070/auth", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result);
                            var data= JSON.parse(result);
                            window.localStorage.setItem('token', data.token);
                            window.localStorage.setItem('role', data.role);
                            this.props.history.push('/');
                            document.location.reload();

                        })
        .catch(error => console.log('error', error));
    }
    render() {
        return (
            <div  style={{ height:'100vh', width: 'auto', backgroundImage:"url('/bglogin.jpg')", backgroundRepeatX:'no-repeat',backgroundRepeatY:'no-repeat'}}>
            <div  className="row justify-content-center" style={{height:'60px'}}></div>
            <div className='container bg' style={{width: '360px'}}>
                    <div className="row justify-content-center ">
                        <h1>LOGIN</h1>
                    </div>
                    <div  className="row justify-content-center" style={{height:'10px'}}></div>
                    <div className="row justify-content-center">
                        <h1>SIAME EXECUTION</h1>
                    </div>
                    <div className="row justify-content-center">
                        <h1>SYSTEM</h1>
                    </div>
                    <div className="row justify-content-center">
                        <input type="text" placeholder="UserName" className="inputlogin" value={this.state.username} onChange={(e)=>this.newUsername(e)}></input>
                    </div>
                    <div  className="row justify-content-center" style={{height:'10px'}}></div>
                    <div className="row justify-content-center">
                        <input type="password" className="inputlogin" placeholder="Password" value={this.state.password} onChange={(e)=>this.newPassword(e)}></input>
                    </div>
                    <div  className="row justify-content-center" style={{height:'10px'}}></div>
                    <div className="row justify-content-center">
                        <button className="btn btn-secondary btnLogIn" onClick={()=>this.login()} style={{bordeRadius: '18px'}}><FaIcons.FaSignInAlt  style={{fontSize: '25px'}}/> SIGN IN</button>
                    </div>
                
            </div>
            </div>
        );
    }
}

export default Auth;