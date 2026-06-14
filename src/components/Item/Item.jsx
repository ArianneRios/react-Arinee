import "./Item.css";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/images";

const Item = ({ producto }) => {
  return (
    <div className="producto">
      <img
        src={getImageUrl(producto.img)}
        alt={producto.titulo}
        onError={(e) => {
          e.currentTarget.src = `${process.env.PUBLIC_URL}/img/Tortas/torta-deco-entera.jpg`;
        }}
      />
      <div className="producto-info">
        <h4 className="titulo">{producto.titulo}</h4>
        <p className="descripcion">{producto.descripcion}</p>
        <p className="precio">Precio: <span className="precio-destacado">${producto.precio}</span></p>
        <p className="categoria">Categoría: {producto.categoria}</p>
        <Link className="ver-mas" to={`/item/${producto.id}`}>
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default Item;
