import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "./UserRole";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faShoppingCart,
  faHeadset,
  faFileAlt,
  faUsers,
  faUser,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";
import toast from 'react-hot-toast';

export default function NavigationBar({ cartItemsCount }) {
  const token = localStorage.getItem("token");
  const role = getUserRole();
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
    toast.success('Sign Out Successfully!')
  };

  return (
    <nav className="navigation">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/">
            <img src="/foodwaste.png" alt="Navbar" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          {role === "user" && (
            <>
              <li>
                <NavLink to="/">
                  <FontAwesomeIcon icon={faHome} />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders">
                  <FontAwesomeIcon icon={faBell} />
                  <span>Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <Badge bg="danger">{cartItemsCount ?? 0}</Badge>
                  <span style={{ position: 'relative', left: '-10px' }}>Cart</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/customers">
                  <FontAwesomeIcon icon={faHeadset} />
                  <span>Support</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </NavLink>
              </li>
            </>
          )}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/customerServices">
                  <FontAwesomeIcon icon={faFileAlt} />
                  <span>Services</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/users">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Users</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Authentication Links */}
        <div className="auth-links">
          {role ? (
            <button className="signout-btn" onClick={handleSignOut}>
              Log Out
            </button>
          ) : (
            <>
              <NavLink to="/signin">Login</NavLink>
              <NavLink to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                <Badge bg="danger">{cartItemsCount ?? 0}</Badge>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
