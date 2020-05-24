
import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';
import AuthenticationService from '../AuthenticationService';

class Header extends Component {
    state = {  }
    render() { 
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const userName = isUserLoggedIn ? AuthenticationService.findUserName() : '';
        return ( 
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><Link  className="navbar-brand" to="/welcome/devansh">ToDO App</Link></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to={`/welcome/${userName}`}>Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to={`/todos/${userName}`}>Todo</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/register">Register</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}

                    </ul>
                </nav>
            </header>
         );
    }
}
 
export default withRouter(Header);