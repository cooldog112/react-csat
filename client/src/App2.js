import React, {Component} from 'react';
import App from './App';
import Admin from './Admin';
import { Route } from 'react-router-dom';

class App2 extends Component {
  render() {
    return (
        <div>
            <Route path="/" component={App} exact/>
            <Route path="/admin" component={Admin} />
        </div>
    );
  }
}


export default App2;