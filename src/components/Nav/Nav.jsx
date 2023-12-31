import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { logoutUser } from "../../redux/actions";

const NavLinkMe = ({ to, children, ...props }) => {
  return (
    <NavLink
      {...props}
      to={to}
      className={({ isActive }) => (isActive ? styles.active : styles.disable)}
    >
      {children}
    </NavLink>
  );
};

export default function Navs(props) {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    // props.logOut();
    // logoutUser();
    dispatch(logoutUser());
    // setCharacters([]);
    // navigate("/");
    // window.location.reload();

  };

  return (
    <div className={styles.container}>
      <NavLinkMe to="/home">
        <button className={styles.buttonBack}>Home</button>
      </NavLinkMe>
      <NavLinkMe to="/favorites">
        <button className={styles.buttonBack}>Favorites</button>
      </NavLinkMe>
      <NavLinkMe to="/about">
        <button className={styles.buttonBack}>About</button>
      </NavLinkMe>
      <SearchBar
        className={styles.SearchBar}
        // onSearch={(characterID, random) => props.onSearch(characterID, random)}
      />
      <NavLinkMe to="/">
        <button className={styles.buttonBack} onClick={handleLogOut}>
          LogOut
        </button>
      </NavLinkMe>
    </div>
  );
}
