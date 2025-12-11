// Sources
// Forked code from https://github.com/sinansarikaya/django-react-auth
// https://useful.codes/implementing-logout-functionality-in-react/
// https://react-bootstrap.github.io/docs/components/navs
// https://react-bootstrap.github.io/docs/components/navbar
//
// 12/2 Reformated the forked navbar to use react-bootstrap
// and added branding and dropdown menus.

import React from 'react';
import { NavLink } from 'react-router-dom';
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
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src={logo}
            alt="FlipTrackr logo"
            width="50"
            height="50"
            className="d-inline-block align-top me-2 nav_logo"
          />{' '}
          FlipTrackr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={NavLink} to="/inventory/fast-add">
                  Fast Add
                </Nav.Link>

                <NavDropdown title="Inventory" id="inventory-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/inventory/product">
                    Product Inventory
                  </NavDropdown.Item>

                  <NavDropdown.Item as={NavLink} to="/products/new">
                    Add New Product
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Insights" id="insights-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/insights/product-cards">
                    ProductCards
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/insights/trends">
                    Trends
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/inventory/category">
                    Manage Categories
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/inventory/product-type">
                    Manage Product Types
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/auth/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/auth/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
