import React from 'react';
import firebase from '../firebase';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
export default class User extends React.Component {
    constructor(){
        super()
        this.state={
            email: "",
            name: "",
            login:"loading..."
        }
    }
    componentDidMount() {
        var user = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log(user);
            this.setState({
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
                id: user.uid,
                login: ""
            })
          } else {
            this.setState({
                login:"not loged in"
            })
          }
      });
    }
    componentDidUpdate(prevProps, prevState) {
        var userRef = firebase.firestore().collection('users').doc(this.state.id);
        userRef.get()
        .then(function(user) {
            if (user.exists) {
                console.log("Document data:", user.data());
            } else {
                console.log("No such document!");
            }
        })
        .catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
    handleLogout = e => {
        firebase.auth().signOut()
        .then(() => {
            alert("singed out")
        })
        .catch(err => {
            alert("Error! check in console");
            console.log(err);
        })
    }

    render(){
        return(
            <div>
                <h1>User</h1>
                    <SearchBar/>
                    <h2>{this.state.email}</h2>
                    <h2>{this.state.name}</h2>
                    <img src={this.state.photo}/>
                    <h1>{this.state.login}</h1>
                    <li>
                      <Link to="/post/">New Post</Link>
                    </li>
                    <input type="button" value="logout" onClick={this.handleLogout}/>
            </div>
        )
    }
}
