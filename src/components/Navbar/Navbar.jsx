import React from "react";
import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img
          src="../img/iconos/logo.png "
          alt="logo-lucia"
          className="img-logo"
        ></img>
        <h1>Arine Rios Llanos CI: 14046843 LP Pastelería </h1>
      </Link>
      <ul className="menu">
        <li>
          <Link className="menu-link" to="/">
            Inicio
          </Link>
        </li>
        <li>
          <Link className="menu-link" to="/productos">
            Productos
          </Link>
        </li>
        <li>
          <Link className="menu-link" to="/productos/tortas">
            Tortas
          </Link>
        </li>
        <li>
          <Link className="menu-link" to="/productos/tartas">
            Tartas
          </Link>
        </li>
        <li>
          <Link className="menu-link" to="/productos/pequenas-tentaciones">
            Pequeñas tentaciones
          </Link>
        </li>
        <li>
          <Link className="menu-link" to="/contacto">
            Contacto
          </Link>
        </li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default Navbar;
