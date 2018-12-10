import React from 'react';
import firebase from '../firebase';
import UserCard from './UserCard'
var db = firebase.firestore().collection('users');
let filteredResult = [];

export default class SearchBar extends React.Component {
    constructor(){
      super();
      this.state = {
        word:'',
        data: []
      };
    }
    handleSearch = (event) => {
      this.setState({word : event.target.value});
      this.search(event.target.value);
      event.preventDefault();
    }
    search = (word) => {
      db.where("name","==",word).get()
       .then(snapshot => {
          console.log(snapshot.docs);
          this.setState({data: snapshot.docs});
       })
       .catch(err => {
         console.log('Error getting documents', err);
       })
    }

    render(){

      return(
        <div>
        <input type="text" value={this.state.word} onChange={this.handleSearch} />
        <ul>
        {
          this.state.data.map((doc)=>{
            return <UserCard key={doc.id} doc={doc}/>
          })
        }
        </ul>

        </div>
      )

    }
}
