import React from 'react';
import {Link} from 'react-router-dom';

class Welcome extends React.Component {
    render() {
        return (
            <div className="container">
               <h1>Welcome</h1>
                Welcome {this.props.match.params.name}! You can manage your todos <Link to="/todos/devansh">here</Link>
            </div>
          );
    }
}
 
export default Welcome;