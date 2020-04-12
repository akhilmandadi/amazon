import React, {Component} from 'react';
import {Route} from 'react-router-dom';


import Signup from './Signup';
import Login from './Login';


class Main extends Component {
    render() {
        return (
            <div>
                 <Route exact path="/" component={Signup}/>
                
                  <Route path="/Login" component={Login}/>
               
              

            </div>
        )
    }
}
export default Main;