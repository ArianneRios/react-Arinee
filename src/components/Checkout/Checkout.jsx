import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/data";
import { Link } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const [pedidoId, setPedidoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const comprar = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const pedido = {
        cliente: {
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono
        },
        productos: carrito.map(prod => ({
          id: prod.id,
          titulo: prod.titulo,
          precio: prod.precio,
          cantidad: prod.cantidad
        })),
        total: precioTotal(),
        fecha: serverTimestamp(),
        estado: "pendiente"
      };

      const pedidosRef = collection(db, "pedidos");
      const docRef = await addDoc(pedidosRef, pedido);
      
      setPedidoId(docRef.id);
      vaciarCarrito();
    } catch (err) {
      console.error("Error al registrar el pedido:", err);
      setError("No se pudo registrar el pedido. Revisa la conexión o las reglas de Firebase.");
    } finally {
      setLoading(false);
    }
  };

  // 1. Pantalla de Éxito
  if (pedidoId) {
    return (
      <div className="container checkout-container">
        <div className="checkout-success-card">
          <div className="success-icon">🎉</div>
          <h1 className="success-title">¡Gracias por tu compra!</h1>
          <p className="success-subtitle">Tu pedido ha sido registrado con éxito.</p>
          <div className="order-info">
            <p className="order-id-label">Número de Pedido:</p>
            <h3 className="order-id-value">{pedidoId}</h3>
          </div>
          <div className="success-actions">
            <Link to="/" className="btn-success-primary">Volver al inicio</Link>
            <Link to="/productos" className="btn-success-secondary">Ver productos</Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Pantalla de Carrito Vacío
  if (carrito.length === 0) {
    return (
      <div className="container checkout-container">
        <div className="checkout-empty-card">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="empty-title">Tu carrito está vacío</h2>
          <p className="empty-subtitle">Agrega algunas delicias de nuestro catálogo antes de finalizar tu compra.</p>
          <Link to="/productos" className="btn-primary">Ver productos</Link>
        </div>
      </div>
    );
  }

  // 3. Formulario de Compra y Resumen
  return (
    <div className="container checkout-container">
      <h1 className="main-title">Finalizar compra</h1>
      
      {error && (
        <div className="checkout-error-banner">
          <p>{error}</p>
        </div>
      )}

      <div className="checkout-layout">
        {/* Formulario */}
        <div className="checkout-form-card">
          <h2 className="card-title">Datos de Contacto</h2>
          <form className="formulario-moderno" onSubmit={handleSubmit(comprar)}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                id="nombre"
                type="text"
                placeholder="Ingresá tu nombre"
                className={errors.nombre ? "input-error" : ""}
                {...register("nombre", { required: "El nombre es obligatorio" })}
              />
              {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="Ingresá tu email"
                className={errors.email ? "input-error" : ""}
                {...register("email", { 
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Formato de correo electrónico inválido"
                  }
                })}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono de Contacto</label>
              <input
                id="telefono"
                type="tel"
                placeholder="Ingresa tu telefono"
                className={errors.telefono ? "input-error" : ""}
                {...register("telefono", { required: "El teléfono es obligatorio" })}
              />
              {errors.telefono && <span className="error-message">{errors.telefono.message}</span>}
            </div>

            <button type="submit" className="btn-comprar" disabled={loading}>
              {loading ? "Procesando pedido..." : "Confirmar Compra"}
            </button>
          </form>
        </div>

        {/* Resumen de Compra */}
        <div className="checkout-summary-card">
          <h2 className="card-title">Resumen de Compra</h2>
          <div className="summary-products-list">
            {carrito.map((prod) => (
              <div key={prod.id} className="summary-product-item">
                <div className="summary-product-detail">
                  <span className="summary-product-name">{prod.titulo}</span>
                  <span className="summary-product-quantity">Cant: {prod.cantidad}</span>
                </div>
                <span className="summary-product-subtotal">${prod.precio * prod.cantidad}</span>
              </div>
            ))}
          </div>
          <div className="summary-total-section">
            <span>Total a pagar:</span>
            <span className="summary-total-value">${precioTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
