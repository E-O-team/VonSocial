import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

var config = {
  apiKey : "AIzaSyDgsymHynug7oiOPCgQGr7_Uls3-QCx1Ec" ,
  authDomain : "vonsocial-71e52.firebaseapp.com" ,
  databaseURL : "https://vonsocial-71e52.firebaseio.com" ,
  projectId : "vonsocial-71e52" ,
  storageBucket : "vonsocial-71e52.appspot.com" ,
  messagingSenderId : "64926478158 "
};
firebase.initializeApp(config);
//

firebase.firestore().settings(settings);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
