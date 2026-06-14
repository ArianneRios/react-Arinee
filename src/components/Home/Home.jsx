import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../firebase/data";
import Item from "../Item/Item";
import "./Home.css";

const Home = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        setLoading(true);
        setError(null);
        const productosRef = collection(db, "productos");
        const q = query(productosRef, limit(3));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setFavoritos(productsList);
      } catch (err) {
        console.error("Error al cargar favoritos:", err);
        setError("No se pudieron cargar los productos recomendados.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Lucía Pastelería</h1>
          <p className="hero-subtitle">
            Elaboramos con pasión los momentos más dulces de tu vida. Productos artesanales hechos con los mejores ingredientes.
          </p>
          <div className="hero-buttons">
            <Link to="/productos" className="btn-primary">
              Ver catálogo
            </Link>
            <Link to="/contacto" className="btn-secondary">
              Contactar
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section className="categories-section container">
        <h2 className="section-title">Nuestras Especialidades</h2>
        <div className="categories-grid">
          <Link to="/productos/tortas" className="category-card card-tortas">
            <div className="category-overlay">
              <h3>Tortas</h3>
              <p>Clásicas, temáticas e irresistibles</p>
            </div>
          </Link>
          <Link to="/productos/tartas" className="category-card card-tartas">
            <div className="category-overlay">
              <h3>Tartas</h3>
              <p>Frutales, cremosas y frescas</p>
            </div>
          </Link>
          <Link to="/productos/pequenas-tentaciones" className="category-card card-tentaciones">
            <div className="category-overlay">
              <h3>Pequeñas Tentaciones</h3>
              <p>Alfajores, brownies y bocados dulces</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Nuestros Favoritos */}
      <section className="favorites-section container">
        <h2 className="section-title">Nuestros Favoritos</h2>
        {loading ? (
          <p className="status-text">Cargando delicias...</p>
        ) : error ? (
          <p className="status-text error-text">{error}</p>
        ) : (
          <div className="favorites-grid">
            {favoritos.map((prod) => (
              <Item producto={prod} key={prod.id} />
            ))}
          </div>
        )}
      </section>

      {/* Beneficios */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">¿Por qué elegirnos?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🎂</div>
              <h3>100% Artesanal</h3>
              <p>Recetas tradicionales hechas a mano con amor y cuidado especial.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">✨</div>
              <h3>Pedidos Personalizados</h3>
              <p>Adaptamos el diseño y sabor a tu evento o celebración soñada.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">⏱️</div>
              <h3>Atención Rápida</h3>
              <p>Garantizamos frescura y puntualidad en cada entrega.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
