import React from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";
import { RiProfileLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { MdCardMembership } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";

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
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/users">
            <FiUsers /> Users
          </NavLink>
        </li>{" "}
        {props.user && (
          <li className="nav-item">
            <NavLink className="nav-link" to="/members-only">
              <MdCardMembership /> Members Only
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/ProfileView">
            <RiProfileLine />
            Profile
          </NavLink>
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
              <MdLogout /> Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/Login">
              Login <MdLogin />
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
export default NavBar;
