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
        userRef = this.props.userRef
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
        db.doc(e.target.id).update({
            friend: firebase.firestore.FieldValue.arrayUnion(userRef.id)
        })
        userRef.update({
            friends: firebase.firestore.FieldValue.arrayUnion(e.target.id),
            invitations: firebase.firestore.FieldValue.arrayRemove(e.target.id)
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
