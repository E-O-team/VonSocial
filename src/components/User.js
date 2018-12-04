import React from 'react';
import Post from './post';
import { Link } from "react-router-dom";

export default class User extends React.Component {
    constructor(props) {
    super(props);
    this.enablePost = this.enablePost.bind(this);

  }

    enablePost(event){
      return <Post />
    }
    render(){
        return(
          <div>
            <h1>User</h1>
            <li>
              <Link to="/post/">Post</Link>
            </li>
          </div>


        )
    }
}
