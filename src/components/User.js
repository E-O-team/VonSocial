import React from 'react';
import firebase from '../firebase';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
export default class User extends React.Component {
    constructor(){
        super()
        this.state={
            email: "",
            name: ""
        }
    }
    componentDidMount() {
        console.log(firebase);
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log(user);
            this.setState({
                email: user.email,
                name: user.name
            })
          } else {
            // No user is signed in.
          }
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
                    <li>
                      <Link to="/post/">New Post</Link>
                    </li>
                    <input type="button" value="logout" onClick={this.handleLogout}/>


            </div>
        )
    }
}
