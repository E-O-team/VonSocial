import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
         <Provider store={store}>
             <div className="App">
               <Login/>
             </div>
         </Provider>
    );
  }
}

export default App;
