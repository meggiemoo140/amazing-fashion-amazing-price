import React from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";

function NavBar(props) {
  return (
    <nav className="Navbar">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <ul>
        <li>
          <NavLink to="/">
            <a class="active" href="#">
              <i class="fa fa-home"></i>
            </a>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
        </li>

        {props.user && (
          <li className="nav-item">
            <NavLink className="nav-link" to="/members-only">
              Members Only
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/ProfileView">ProfileView</NavLink>
        </li>
      </ul>

      {props.user ? (
        <ul className="navbar-nav">
          {/* <li className="nav-item">
            <NavLink className="nav-link" to={`/users/${props.user.id}`}>
              Profile {props.user.username}
            </NavLink>
          </li> */}
          <li className="nav-item">
            {/* Log out user. Then go to home page. */}
            <Link className="nav-link" to="/" onClick={props.logoutCb}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/Login">
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
export default NavBar;
