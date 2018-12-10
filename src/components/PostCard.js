import React from 'react';
import firebase from '../firebase';
var db = firebase.firestore();
export default class PostCard extends React.Component{
  constructor(){
    super();
    this.state = {
      avatar: '',
      name: '',
      comment: ''
    }
  }
  componentDidMount(){
    var post = this.props.post;
    db.collection('users').doc(post.owner).get().then(doc => {
        this.setState({
          avatar: doc.data().avatar
        })
    })

    db.collection('users').doc(firebase.auth().currentUser.uid).get().then(doc => {
        this.setState({
          name: doc.data().name
        })
    })
  }
  onLike = e => {
    var post = this.props.post;
    db.collection('posts').doc(post.uid).update({
      likes: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
    });
    e.preventDefault();
  }

  onChangeComment = e => {
    this.setState({comment:e.target.value})
    e.preventDefault();
  }

  onSubmit = e => {
    var post = this.props.post;
    db.collection('posts').doc(post.uid).update({
      comments: firebase.firestore.FieldValue.arrayUnion("-"+this.state.name+"- "+this.state.comment)
    });
    e.preventDefault();
  }

  render(){
    var post = this.props.post;

    return(
      <div>
          <img src={this.state.avatar} height='42' width='42'/>
          <h3>{post.title}</h3>
          <p>{post.detail}</p>
          <input type="button" value="Like" onClick={this.onLike}/>
          {(post.likes == undefined)? <h6>0</h6> : <h6>{post.likes.length}</h6>}
          <h4>Comments :</h4>
          <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.comment} onChange={this.onChangeComment}/>
          <input type="submit" value="Submit"/>
          </form>

          {(post.comments == undefined)? <h6>No comments</h6> : post.comments.map((comment, index) => {
            return <h6 key={index}>{comment}</h6>
          })}
          <hr/>

      </div>
    )
  }
}
