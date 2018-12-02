import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
         <Provider store={store}>
          <Router>
             // <div className="App">
             //   <Login/>
             // </div>
             <Route path='/' component={Home} />
             <Route path='/login' component={Login} />

          </Router>
         </Provider>
    );
  }
}

export default App;
