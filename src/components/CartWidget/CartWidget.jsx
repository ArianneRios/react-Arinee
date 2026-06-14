import React, { useContext } from "react";
import "./CartWidget.css";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { cantidadEnCarrito } = useContext(CartContext);

  return (
    <div>
      <Link className="cart-link" to="/carrito">
        <img
          className="icono-carrito"
          src={`${process.env.PUBLIC_URL}/img/iconos/carrito-rosa.png`}
          alt="Carrito Rosa"
        />
        <span className="cart-item-count">{cantidadEnCarrito()}</span>
      </Link>
    </div>
  );
};

export default CartWidget;
