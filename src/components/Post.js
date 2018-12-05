import React from 'react';
import firebase from '../firebase';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            detail: ''
        };
    }
    handleChangeTitle = (event) => {
        this.setState({title: event.target.value});
    }
    handleChangeDetail = (event) => {
        this.setState({detail: event.target.value});
    }
    handleSubmit = (event) => {
        var db = firebase.firestore();
        var userId = firebase.auth().currentUser.uid;
        db.collection('posts').add({
            title: this.state.title,
            detail: this.state.detail,
            owner: userId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(ref => {
            console.log(ref);
            db.collection('users').doc(userId).update({
                posts: firebase.firestore.FieldValue.arrayUnion(ref.id)
            });
        })
        .then(success => {
            alert("posted!")
        })
        .catch(err => console.log(err))
        event.preventDefault();
    }
    render() {
        return (<form onSubmit={this.handleSubmit}>
            <label>
                Post
                <input type="text" value={this.state.title} onChange={this.handleChangeTitle}/>
                <input type="text" value={this.state.detail} onChange={this.handleChangeDetail}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>)
    }
}
