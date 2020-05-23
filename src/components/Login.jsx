import React from 'react';
import AuthenticationService from '../AuthenticationService.js';
import '../App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "ranga",
            password : "password@1234",
            valid : true
        }
    }

    handleOnSubmit = () => {
       
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
        .then((response) => {
            AuthenticationService.registerSuccessfulLoginForJwt(this.state.username,response.data.token);
            this.props.history.push(`/todos/${this.state.username}`);
        })
        .catch((error) => {
            this.setState({
                valid : false
            });
        })
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    render() {
        return (  
            <div>
                <h1>Login</h1>
                <div className="container">
                {!this.state.valid && <div className="alert alert-warning error">
                    Invalid login credentials
                </div>}
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange.bind(this)}/>Username
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>Password
                <button type="button" onClick={this.handleOnSubmit.bind(this)}>Login</button>
                
                </div>

            </div>
        );
    }
}
 
export default Login;