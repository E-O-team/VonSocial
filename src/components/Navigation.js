import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import User from './User';
import Post from './Post';
import SignInScreen from './Signin';
const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login/">Login</Link>
          </li>
          <li>
            <Link to="/user/">User</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/login/" component={SignInScreen} />
      <Route path="/user/" component={User} />
      <Route path="/post/" component={Post} />

    </div>
  </Router>
);

export default AppRouter;
