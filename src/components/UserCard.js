import React from 'react';
import firebase from '../firebase';
var db = firebase.firestore();
export default class UserCard extends React.Component{
  constructor(){
    super();
    this.state = {
      Requested : true,
      friend : false
    }
  }
  componentDidMount() {
    var data = this.props.doc.data();
    db.collection('users').doc(data.uid).get().then(doc => {

      doc.data().invitations.forEach(field => {
        if(field === firebase.auth().currentUser.uid){
          this.setState({Requested: false})
        }
      })

      doc.data().friends.forEach(field => {
        if(field === firebase.auth().currentUser.uid){
          this.setState({friend: true})
        }
      })
    })
  }
  AddFriend = (data, e) => {

    if(data.uid != firebase.auth().currentUser.uid)
    {
    db.collection('users').doc(data.uid).update({
        invitations: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
    }).then(success => {
        alert("sent!")
    })
    }
    e.preventDefault();
  }
  render(){
    var data = this.props.doc.data();
    let friendRequest = (this.state.Requested && !this.state.friend) ? <input type="button" value="+" onClick={(e) => this.AddFriend(data, e)} />
                        : (this.state.friend) ? <h6>Friend</h6> : <h6>Da gui loi moi</h6>;

    return(
      <div>
        <h3>{data.name}</h3>
        {friendRequest}
      </div>
    )
  }
}
