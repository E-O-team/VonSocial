import React from 'react';
import firebase from '../firebase';

export default class UserCard extends React.Component{
  constructor(){
    super();
  }
  AddFriend = (data) => {
    var db = firebase.firestore();
    db.collection('users').doc(data.uid).update({
    invitations: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
        });
  }
  render(){
    var data = this.props.doc.data();
    return(
      <div>
        <h4>{data.name}</h4>
        <input type="button" value="+" onClick={this.AddFriend(data)} />
      </div>
    )
  }
}
