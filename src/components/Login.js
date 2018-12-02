import React from 'react';
import firebase from "firebase";
import Home from "./Home";
class Login extends React.Component {
    constructor(props) {
    super(props);
    this.state = {email: '', password: ''};

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword= this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    alert('A email was submitted: ' + this.state.email);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(success => {
      console.log('success');
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log('err');
      var errorMessage = error.message;
      // ...
});
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Login:
          <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
          <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
};

export default Login;
