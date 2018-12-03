import firebase from "firebase";

var config = {
  apiKey : "AIzaSyDgsymHynug7oiOPCgQGr7_Uls3-QCx1Ec" ,
  authDomain : "vonsocial-71e52.firebaseapp.com" ,
  databaseURL : "https://vonsocial-71e52.firebaseio.com" ,
  projectId : "vonsocial-71e52" ,
  storageBucket : "vonsocial-71e52.appspot.com" ,
  messagingSenderId : "64926478158 "
};
firebase.initializeApp(config);

export default firebase
