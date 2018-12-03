import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './components/Navigation';
class App extends Component {
  render() {
    return (
         <Provider store={store}>
                 <div className="App">
                     <AppRouter/>
                 </div>
         </Provider>
    );
  }
}

export default App;
