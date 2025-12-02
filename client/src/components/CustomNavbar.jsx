// Sources
// Forked code from https://github.com/sinansarikaya/django-react-auth
// https://useful.codes/implementing-logout-functionality-in-react/
// https://react-bootstrap.github.io/docs/components/navs
// https://react-bootstrap.github.io/docs/components/navbar
//
// 12/2 Reformated the forked navbar to use react-bootstrap
// and added branding and dropdown menus.

import React from 'react';
//import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import logo from '../media/logos/nav_logo.png';
import '../styles/nav.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CustomNavbar() {
  const { isLoggedIn } = useAuth();
  const logout = useLogout();

  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            alt="flipTrackr logo"
            width="50"
            height="50"
            className="d-inline-block align-top me-2 nav_logo"
          />{' '}
          FlipTrackr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
            <Nav.Link href="/">Home</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link href="/auth/User">User Info</Nav.Link>
                <></>

                <NavDropdown title="Inventory" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Insights" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link
                  as="button"
                  onclick={logout}
                  className="btn btn-link nav-link"
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/auth/login">Login</Nav.Link>
                <Nav.Link href="/auth/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default CustomNavbar;
