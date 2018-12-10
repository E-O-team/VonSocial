import React from 'react';
import firebase from '../firebase';
import PostCard from './PostCard'
var posts
export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            detail: '',
            posts: ''
        };
    }
    componentDidMount() {
        firebase.firestore().collection('posts').where("owner", "==", this.props.id).onSnapshot(doc => {
            posts = doc.docs.map(post => {
                return post.data()
            })
            this.setState({
                posts: posts
            })
        })
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
            db.collection('posts').doc(ref.id).update({
                uid : ref.id
            });
        })
        .then(success => {
            alert("posted!")
        })
        .catch(err => console.log(err))
        event.preventDefault();
    }
    handleDeletePost = e => {

    }
    render() {
        return (
          <div>
          { (this.props.index == 0)?
            <form onSubmit={this.handleSubmit}>
                <h3>Make a Post</h3>
                    <input type="text" value={this.state.title} onChange={this.handleChangeTitle}/>
                    <input type="text" value={this.state.detail} onChange={this.handleChangeDetail}/>
                <input type="submit" value="Submit"/>
                <h2>Posts</h2>
            </form> : <br/>
          }
            {this.state.posts && this.state.posts.map((post, index) => {
                return <PostCard key={index} post={post}/>
            })}
        </div>
          )
    }
}
