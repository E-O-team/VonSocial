import React from 'react';
import firebase from '../firebase';
import UserCard from './UserCard'
var db = firebase.firestore().collection('users');
let filteredResult = [];

export default class SearchBar extends React.Component {
    constructor(){
      super();
      this.state = {
        word:''
      };
    }
    handleSearch = (event) => {
      this.setState({word : event.target.value});
    }

    handleFind = e => {
        db.where("name","==",this.state.word).get()
          .then(snapshot => {
              console.log(snapshot);
             filteredResult = snapshot.docs;

          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
    }

    render(){
      return(
        <div>
        <input type="text" value={this.state.word} onChange={this.handleSearch} />
        <input type="button" value="find" onClick={this.handleFind}/>
        <ul>
        {
          filteredResult.map((doc) => {
            return <UserCard key={doc.id} doc={doc} />
          })
        }
        </ul>

        </div>
      )

    }
}
