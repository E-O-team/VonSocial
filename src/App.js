import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
         <Provider store={store}>
             <div className="App">
               <Todos/>
             </div>
         </Provider>
    );
  }
}

export default App;
