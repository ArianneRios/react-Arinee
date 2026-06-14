import React, { useEffect, useState } from "react";
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/data";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const titulo = "Productos";
  const [error, setError] = useState(null);
  const categoria = useParams().categoria;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setError(null);
        const productosRef = collection(db, "productos");
        const q = categoria
          ? query(productosRef, where("categoria", "==", categoria))
          : productosRef;

        const querySnapshot = await getDocs(q);
        const fetchedProductos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(fetchedProductos);
      } catch (err) {
        console.error("Error fetching products: ", err);
        setError("No se pudieron cargar los productos desde Firebase.");
      }
    };

    fetchProductos();
  }, [categoria]);

  return (
    <div>
      {error ? (
        <div className="container">
          <p className="error-message" style={{ color: "red", textAlign: "center", marginTop: "2rem", fontSize: "1.2rem", fontWeight: "bold" }}>
            {error}
          </p>
        </div>
      ) : (
        <ItemList productos={productos} titulo={titulo} />
      )}
    </div>
  );
};

export default ItemListContainer;
