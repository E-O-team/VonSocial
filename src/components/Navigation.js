import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import User from './User';
import SignInScreen from './Signin';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
export default class AppRouter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Router>
            <div>
              <Navbar color="NavItemght" NavItemght expand="md">
                <NavbarBrand href="/">VonSocial</NavbarBrand>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                      <NavLink>
                          <Link to="/">Home</Link>
                      </NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink>
                    <Link to="/login">Login</Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink>
                    <Link to="/user">User</Link>
                    </NavLink>
                  </NavItem>
                </Nav>
            </Navbar>

              <Route path="/" exact component={Home} />
              <Route path="/login" component={SignInScreen} />
              <Route path="/user" component={User} />

            </div>
          </Router>
        )
    }
}
