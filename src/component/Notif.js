import React, { Component } from 'react';

class Notif extends Component {
    constructor(props){
        super(props);
        this.state={
            success: props.success,
            message: props.message
        }
    }
    render() {
        return (
            <div>
                <div class="alert alert-primary" role="alert">
                    {this.state.message}
                 </div>
            </div>
        );
    }
}

export default Notif;