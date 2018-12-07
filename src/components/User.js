import React from 'react';
import firebase from '../firebase';
import {
    Link
} from 'react-router-dom';
import SearchBar from './SearchBar';
import FriendRequest from './FriendRequest';
var userRef = {}
var user = firebase.auth().currentUser;
var db = firebase.firestore().collection('users');

console.log(firebase.app())
export default class User extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            name: "",
            login: "loading...",
            user: {},
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                userRef = firebase.firestore().collection('users').doc(user.uid);
                userRef.get()
                    .then(function(user) {
                        if (user.exists) {
                            var tempUser = user.data();
                            return tempUser
                        } else {
                            console.log("No such document!");
                        }
                    })
                    .then(tempUser => {
                        this.setState({
                            user: tempUser,
                            login: ""
                        })
                    })
                    .catch(function(error) {
                        console.log("Error getting document:", error);
                    });
            } else {
                this.setState({
                    login: "not loged in"
                })
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
    componentDidUpdate(prevProps, prevState) {
        // const friendRequest = this.state.user.invitations.map(id => {
        //     db.doc(id).get().then(user => {
        //         if (user.exists) {
        //             console.log(user.data());
        //         } else {
        //             // doc.data() will be undefined in this case
        //             console.log("No such document!");
        //         }
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // })
    }
    render() {
        return (
            <div>
                <h1>User</h1>
                    <SearchBar/>
                    <h2>{this.state.user.email}</h2>
                    <h2>{this.state.user.name}</h2>
                    <h3>Friends:</h3>
                    { this.state.user.friends && this.state.user.friends.map((user, index) =>{
                        return(
                            <h4 key={index}>{user}</h4>
                        )
                    })}
                    <img src={this.state.user.avatar}/>
                    <h1>{this.state.login}</h1>
                    <li>
                      <Link to="/post/">New Post</Link>
                    </li>
                    <div>
                        { this.state.user.invitations && <FriendRequest userRef={userRef} invitations={this.state.user.invitations}/> }
                    </div>
                    <input type="button" value="logout" onClick={this.handleLogout}/>
            </div>
        )
    }
}
