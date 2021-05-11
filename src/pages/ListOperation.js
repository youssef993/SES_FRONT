import React, { Component } from 'react';
import Operation from '../component/Operation';
import * as FaIcons from 'react-icons/fa';
import Notif from '../component/Notif';

class ListOperation extends Component {
    constructor(props){
        super(props);
        this.state={
            produit: props.match.params,
            opera:'',
            of:'',
            ordre:'',
            imagepath:'',
            operation: [],
            success:'',
            message:''
        }
        this.getOperation= this.getOperation.bind(this);
    }
    componentDidMount(){
      const token  = window.localStorage.getItem('token');
      const role  = window.localStorage.getItem('role');
  
      if (token != null && (role== "admin"||role=="technique")) {
          console.log("connected");
          this.getOperation();
      } else {
          this.props.history.push('/authentification');
          window.localStorage.clear();
  
      }
       
    }
    operation(e){
        this.setState({
          opera: e.target.value
       })
             }
  
        of(e){
          this.setState({
            of: e.target.value
                     })
           }
       ordre(e){
          this.setState({
            ordre: e.target.value
                     })
           }
           imagepath(e){var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("authenticated", window.localStorage.getItem('token'));
            var formdata = new FormData();
            var file = e.target.files;
            console.log(file);
            formdata.append("operationImg", file[0], file[0].name);

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

           fetch("http://localhost:8070/app/app/upload/"+ this.state.produit.produit+this.state.opera+this.state.ordre, requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result);
            var data= JSON.parse(result);
              this.setState({
                success: data.success,
                message: data.message
              })
              })
            .catch(error => {console.log('error', error);
            this.setState({
              success: false,
              message: error
            })
          });
            }
            
            
      newop(){var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authenticated", window.localStorage.getItem('token'));
  
  var raw = JSON.stringify({"operation":this.state.opera,"produit":this.state.produit.produit,"of":null,"ordre":this.state.ordre,"touv":null,"tfer":null,"imagepath":this.state.produit+ this.state.ordre});
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
      fetch("http://localhost:8070/app/ajoutop", requestOptions)
.then(response => response.text())
.then(result => {console.log(result);
  var data= JSON.parse(result);
    this.setState({
      success: data.success,
      message: data.message
    });
    this.getOperation();
    })
  .catch(error => {console.log('error', error);
  this.setState({
    success: false,
    message: error
  })
});

  }
    getOperation(){var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authenticated", window.localStorage.getItem('token'));

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8070/app/listop/"+ this.state.produit.produit, requestOptions)
          .then(response => response.text())
          .then(result => {console.log(result);
                   var data= JSON.parse(result);
                   console.log(data);
                   this.setState({
                       operation: data
                   })
                   
        
        })
          .catch(error => console.log('error', error));
        }
    render() {
        return (
          <div className="container">
            
            <div className="row justify-content-md-center">
              <div class="input-group col-7">
                <h1>add op </h1>
              </div>
                <div class="input-group col-7">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style={{height: '45px'}}>OPERATION:</span>
                  </div>
                  <textarea class="form-control" style={{height: '45px'}} aria-label="operation" value={this.state.opera} onChange={(e)=>{this.operation(e)}}></textarea>
                </div>
                <div class="input-group col-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text" style={{height: '45px'}}>ORDER:</span>
                  </div>
                  <textarea class="form-control" style={{height: '45px'}} aria-label="ordre"  value={this.state.ordre} onChange={(e)=>{this.ordre(e)}} ></textarea>
                </div>
              <div className='col-12' style={{height:'10px'}}></div>
              <div className='col-8' >
                <input type="file" id="file" value={this.state.imagepath} onChange={(e)=>{this.imagepath(e)}} ></input>
                <button className="btn btn-primary" onClick={()=>{this.newop()}}><FaIcons.FaMedapps  style={{fontSize: '25px'}}/>ADD</button>
              </div>
                <div class="input-group col-8">
                    {
                      this.state.operation.map((op)=>{
                          return <Operation id= {op._id} operation={op.operation} produit={op.produit} ordre={op.ordre} img={op.imagepath} load={this.getOperation}/>
                      })
                    }
                </div>
            </div>
         </div>
        );
    }
}

export default ListOperation;