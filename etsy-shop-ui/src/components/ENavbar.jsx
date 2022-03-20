import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { Component, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import cookie from "react-cookies";
import { Navigate, withRouter } from "react-router";
import SearchBox from "./SearchBox";
import Login from "./Login";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout, signin, signout } from "../actions/userActions";
import { connect } from "react-redux";
import axios from "axios";
import { setproductaction } from "../actions/productactions";

function ENavbar(props) {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  //handle logout to destroy the cookie
  const handleLogout = (e) => {
    console.log("Inside logout");
    dispatch(logout());
    axios.get("http://localhost:3001/api/products").then((response) => {
      dispatch(setproductaction(response.data));
    });
    cookie.remove("cookie", { path: "/" });
  };

  return (
    <div className="ENavbar">
      <Navbar bg="white" variant="white">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="logo">ETSYY</Navbar.Brand>
          </LinkContainer>
          <SearchBox></SearchBox>
          <Nav className="me-auto">
            {!isLoggedIn ? (
              <Login
                buttonName={"Favourites"}
                redirectTo={"/favorites"}
              ></Login>
            ) : (
              <Link to="/favorites" className="nav-link">
                Favourites
              </Link>
            )}
          </Nav>
          <Nav className="me-auto">
            {!isLoggedIn ? (
              <Login
                buttonName={"Sell"}
                redirectTo={"/createshop"}
              ></Login>
            ) : userInfo[0].shopname === null ? (
              <Link to="/createshop" className="nav-link">
                Sell
              </Link>
            ) : (
              <Link
                to={"/shoppage/" + userInfo[0].shopname}
                className="nav-link"
              >
                Sell
              </Link>
            )}
          </Nav>
          <Nav className="me-auto">
            {!isLoggedIn ? (
              <Login
                buttonName={"My Purchases"}
                redirectTo={"/mypurchases"}
              ></Login>
            ) : (
              <Link to="/mypurchases" className="nav-link">
                My Purchases
              </Link>
            )}
          </Nav>
          <Nav className="me-auto">
            {!isLoggedIn ? (
              <Login
                buttonName={"Profile"}
                redirectTo={"/profile"}
              ></Login>
            ) : (
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            )}
          </Nav>
          <Nav className="me-auto">
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </Nav>
          {isLoggedIn ? (
            <ul class="nav navbar-nav navbar-right">
              <li>
                <Link to="/" onClick={handleLogout} className="nav-link">
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul class="nav navbar-nav navbar-right">
              <li>
                <Login buttonName={"Login"} redirectTo={"/"}></Login>
              </li>
            </ul>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default ENavbar;
