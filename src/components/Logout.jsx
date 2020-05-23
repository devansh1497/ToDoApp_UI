import React, { Component } from 'react';

class Logout extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <h1>You are now logged out...</h1>
                <div className="container">
                    Thank you for using our ToDo App!
                </div>
            </div>
          );
    }
}
 
export default Logout;