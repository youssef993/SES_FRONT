import React, { Component } from 'react';
import Comp from './Comp';
import * as IoIcons from 'react-icons/fa';

class Of extends Component {
    constructor(props){
        super(props);
        this.state={
            produit: props.produit,
            of: props.orderf,
            id: props.id,
            composants: props.composants,
            newcomp:'',
            getall: props.getall,
            formvue:true,
            datavue:true
        }
        console.log(props);
    }
    udatedatavue(){
        this.setState({
            datavue: !this.state.datavue
        })
    }
    updatevue(){
        this.setState({
            formvue: !this.state.formvue
        })
    }
    comp(e){
        this.setState({
            newcomp: e.target.value
        })
    }
    affectComp(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authenticated", window.localStorage.getItem('token'));

        
        var raw = JSON.stringify({"id":this.state.id,"produit":this.state.produit,"id3":null,"composants":this.state.composants,"ordreDeFabrication":this.state.of,"statut":"encours"});
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8070/app/updcompprod/"+ this.state.newcomp, requestOptions)
          .then(response => response.text())
          .then(result => {console.log(result);
                            this.updatevue();
                            this.state.getall();
                           
                          })
          .catch(error => console.log('error', error));
 }
    render() {
        return (
            <div class="col-sm-4">
                <button type="button" class="btn btn-secondary btn2" hidden={!this.state.formvue} onClick={() => this.updatevue()}><IoIcons.FaAngleDoubleDown style={{fontSize: '25px'}}/> affect component</button>
                <input hidden={this.state.formvue} type="text" placeholder="Serial number" value={this.state.newcomp} onChange={(e)=>{this.comp(e)}} ></input>
                <button hidden={this.state.formvue} className="btn btn-success btn2" onClick={() => {this.affectComp();window.location.reload(false);}}><IoIcons.FaAngleDoubleRight className="tourne" style={{fontSize: '25px'}}/>affect Composant</button>
                <table class="table table-hover">
                <thead>
                    <tr >
                    <th scope="col"><button type="button" class="btn btn-success"onClick={() => this.udatedatavue()} style={{borderRadius:'50%',width: '40px',height: '30px'}}><IoIcons.FaEye style={{fontSize: '25px',marginTop: '-11px',marginLeft: '-5px'}}/></button></th>
                    <th scope="col">{this.state.produit}</th>
                    <th scope="col">{this.state.of}</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody hidden={this.state.datavue}>
                    
                         {
                            this.state.composants.map((comp)=>{
                                return <Comp article={comp.article} sn={comp.ID1} />
                            })
                        }
                    
                </tbody>
                </table>
                
                
            </div>
        );
    }
}

export default Of;