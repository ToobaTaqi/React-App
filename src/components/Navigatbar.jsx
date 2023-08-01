import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

export default function Navigatbar() {
  return (
    <Navbar expand="lg" className="navbaar fixed-top">
      <Container>
        <Link className="navbar-brand text-light"  to="/">
          Let's-Eat
        </Link>
        <Nav className="ms-auto">
          <Link className="ms-4 nvbtn" to="/">
            Home
          </Link>
          <Link className="ms-4  nvbtn" to="/products">
            All Meals
          </Link>
          <Link className="ms-4  nvbtn" to="/login">
            Login/Signup
          </Link>
          {/* <Link className="ms-4 btn btn-light" to="/mycart">My Cart</Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
