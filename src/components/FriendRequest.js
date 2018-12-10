import React from 'react';
import firebase from 'firebase';
var db = firebase.firestore().collection("users")
var userRef
export default class FriendRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            invitations: []
        }
        userRef = db.doc(this.props.userRef.uid)
    }
    componentWillMount() {
        this.props.invitations.forEach(id => {
            db.doc(id).get().then(user => {
                if (user.exists) {
                    this.setState({
                        invitations: [...this.state.invitations, user.data()]
                    })
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(err => {
                console.log(err);
            })
        })
    }

    handleAccept = e => {
        console.log(e.target.id);
        let friendId = e.target.id
        db.doc(friendId).update({
            friends: firebase.firestore.FieldValue.arrayUnion(this.props.userRef.uid)
        })
        userRef.update({
            friends: firebase.firestore.FieldValue.arrayUnion(friendId),
            invitations: firebase.firestore.FieldValue.arrayRemove(friendId)
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(err => console.log(err))
    }
    render(){
        return(
            <div>
                <h1>invitations</h1>
                {this.state.invitations.map((user, id) => {
                    return(
                        <div key={id}>
                            <h1>{user.name}</h1>
                            <input type="button" value="accept" onClick={this.handleAccept} id={user.uid}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}
