import React, { Component } from 'react';

class addop extends Component {
    constructor(props){
        super(props);
        
        this.state={
            operation:'',
            produit:'',
            of:'',
            ordre:'',
            imagepath:''
        }

   }
   componentDidMount(){
    const token  = window.localStorage.getItem('token');
    const role  = window.localStorage.getItem('role');

    if (token != null && (role== "admin"||role=="technique")) {
        console.log("connected");
    } else {
        this.props.history.push('/authentification');
        window.localStorage.clear();

    }
    
}
     operation(e){
          this.setState({
            operation: e.target.value
         })
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
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
              };

             fetch("http://localhost:8070/app/app/upload/"+ this.state.produit+this.state.operation+this.state.ordre, requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
              }
              

        newop(){
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("authenticated", window.localStorage.getItem('token'));
    
    var raw = JSON.stringify({"operation":this.state.operation,"produit":this.state.produit,"of":null,"ordre":this.state.ordre,"touv":null,"tfer":null,"imagepath":this.state.produit+ this.state.ordre});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
        fetch("http://localhost:8070/app/ajoutop", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
    }
    render() {
        return (
            <div className="container">
              <div className="row justify-content-md-center">
                <h1>add op </h1>
                <input type="text" placeholder="operation" value={this.state.operation} onChange={(e)=>{this.operation(e)}} /> <p></p>
                <input type="text" placeholder="produit" value={this.state.produit} onChange={(e)=>{this.produit(e)}} ></input><p></p>
                <input type="text" placeholder="ordre" value={this.state.ordre} onChange={(e)=>{this.ordre(e)}} ></input><p></p>
                <input type="file" id="file" value={this.state.imagepath} onChange={(e)=>{this.imagepath(e)}} ></input>
             
                <button onClick={()=>{this.newop()}}>add opp</button>
              </div>
            </div>
        );
    }
}

export default addop;