import React from "react";
import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img
          src={`${process.env.PUBLIC_URL}/img/iconos/LogoLN.png`}
          alt="Logo Pastelería"
          className="img-logo"
        />
        <h1 className="logo-title">Arianne Rios Pastelería</h1>
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
