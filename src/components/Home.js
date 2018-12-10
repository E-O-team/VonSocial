import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions/actions';
import firebase from 'firebase';
import Posts from './Posts';
var userRef
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc => {
                    userRef = doc.data()
                    this.setState({
                        user: userRef,
                    })
                })
            }
        })
    }
    render(){
        return(
            <div>
                <h1>Welcome to home</h1>
                    {this.state.user.friends && this.state.user.friends.map((friend, index) => {
                        return <Posts key={index} id={friend} index={index}/>
                    })}
            </div>
        )
    }
};

export default Home;
