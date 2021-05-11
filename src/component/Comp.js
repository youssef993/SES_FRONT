import React, { Component } from 'react';

class Comp extends Component {
    constructor(props){
        super(props);
        this.state={
            article: props.article,
            sn: props.sn,
            vue: props.datavue
        }
    }
    render() {
        return (
            <tr>
                <td>SN: {this.state.sn}</td>
                <td>{this.state.article}</td>
                <td><button>bouton</button> </td>
            </tr>
        );
    }
}

export default Comp;