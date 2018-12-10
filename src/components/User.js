import React from 'react';
import firebase from '../firebase';
import {
    Link
} from 'react-router-dom';
import SearchBar from './SearchBar';
import FriendRequest from './FriendRequest';
import Posts from './Posts';
import { Button } from 'reactstrap';
var userRef
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
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc => {
                    userRef = doc.data()
                    this.setState({
                        user: userRef,
                        login: ""
                    })

                })
            }else {
                this.setState({
                    login: "not loged in"
                })
            }
        })
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
    render() {
        return (
            <div>
                <Button color="danger" onClick={this.handleLogout}>Logout</Button>
                <SearchBar/>
                <h1>User</h1>
                    <h2>{this.state.user.email}</h2>
                    <h2>{this.state.user.name}</h2>
                    <img src={this.state.user.avatar}/>
                    <hr/>
                    <h3>Friends:</h3>
                    { this.state.user.friends && this.state.user.friends.map((user, index) =>{
                        return(
                            <h4 key={index}>{user}</h4>
                        )
                    })}
                    <div>
                        { this.state.user.invitations && <FriendRequest userRef={userRef} invitations={this.state.user.invitations}/> }
                    </div>
                    <h1>{this.state.login}</h1>
                    <hr/>
                    { this.state.user.uid && <Posts id={this.state.user.uid} index={0}/> }
            </div>
        )
    }
}
