import React, { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/data";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setError(null);
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem({ ...docSnap.data(), id: docSnap.id });
        } else {
          setError("No se pudieron cargar los productos desde Firebase.");
        }
      } catch (err) {
        console.error("Error fetching product: ", err);
        setError("No se pudieron cargar los productos desde Firebase.");
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div>
      {error ? (
        <div className="container">
          <p className="error-message" style={{ color: "red", textAlign: "center", marginTop: "2rem", fontSize: "1.2rem", fontWeight: "bold" }}>
            {error}
          </p>
        </div>
      ) : (
        item && <ItemDetail item={item} />
      )}
    </div>
  );
};

export default ItemDetailContainer;
