import React, { Component } from 'react';
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Welcome from "./Welcome";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListTodos from './ListTodos';
import Header from './Header';
import Footer from './Footer';
import Logout from './Logout';
import AuthenticatedRoute from './AuthenticatedRoute';
import UpdateTodo from './UpdateTodo';
import Register from './Register';

class TodoApp extends Component {
    state = {  }
    render() { 
        return ( 
            // <div>
            // <Router>
                
            //     <Header/>
            //     <Switch>
            //         <Route path="/" exact component={Login}></Route>
            //         <Route path="/login" component={Login}></Route>
            //         <Route path="/welcome/:name" exact component={Welcome}></Route>
            //         <Route path="/todos" component={ListTodos}></Route>
            //         <Route path="/logout" component={Logout}></Route>
            //         <Route component={ErrorPage}></Route>
            //     </Switch>
            //     <Footer></Footer>

            // </Router>
            // </div>

<div className="TodoApp">
<Router>
    <>
        <Header/>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}></Route>
            <AuthenticatedRoute exact path="/welcome/:name" component={Welcome}/>
            <AuthenticatedRoute exact path="/todos/:name/:id/update" component={UpdateTodo}/>
            <AuthenticatedRoute path="/todos/:name" component={ListTodos}/>
            <AuthenticatedRoute path="/logout" component={Logout}/>
            
            <Route component={ErrorPage}/>
        </Switch>
        {/* <Footer/> */}
    </>
</Router>
{/*<LoginComponent/>
<WelcomeComponent/>*/}
</div>

         );
    }
}
 
export default TodoApp;