import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp2S5P033kACC19KosKj2GTMtNSpdeGtM",
  authDomain: "react-arinee-demo.firebaseapp.com",
  projectId: "react-arinee-demo",
  storageBucket: "react-arinee-demo.firebasestorage.app",
  messagingSenderId: "720365106272",
  appId: "1:720365106272:web:73aa7bc433a79e272c7f05",
  measurementId: "G-DDXPF7SV30"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productos = [
  {
    id: "torta-decorada",
    titulo: "Torta Decorada",
    descripcion: "Torta personalizada ideal para cumpleaños y eventos especiales.",
    img: "/img/Tortas/torta-deco-entera.jpg",
    categoria: "tortas",
    precio: 150,
    stock: 10
  },
  {
    id: "selva-negra",
    titulo: "Selva Negra",
    descripcion: "Torta clásica de chocolate con crema y cerezas.",
    img: "/img/Tortas/selva-negra-entera.jpg",
    categoria: "tortas",
    precio: 130,
    stock: 8
  },
  {
    id: "cheesecake",
    titulo: "Cheesecake",
    descripcion: "Cheesecake suave con base crocante y cobertura especial.",
    img: "/img/Tortas/cheesecake-entera.jpg",
    categoria: "tortas",
    precio: 120,
    stock: 6
  },
  {
    id: "milhojas",
    titulo: "Milhojas",
    descripcion: "Torta tradicional de capas finas con dulce de leche.",
    img: "/img/Tortas/milhojas.jpg",
    categoria: "tortas",
    precio: 110,
    stock: 7
  },
  {
    id: "tiramisu",
    titulo: "Tiramisú",
    descripcion: "Postre italiano con crema suave, café y cacao.",
    img: "/img/Tortas/tiramisu-entero.jpg",
    categoria: "tortas",
    precio: 125,
    stock: 5
  },
  {
    id: "pavlova",
    titulo: "Pavlova",
    descripcion: "Postre elegante con merengue, crema y frutas.",
    img: "/img/Tortas/pavlova-entera.jpg",
    categoria: "tortas",
    precio: 140,
    stock: 5
  },
  {
    id: "tarta-frutillas",
    titulo: "Tarta de Frutillas",
    descripcion: "Tarta fresca con crema pastelera y frutillas naturales.",
    img: "/img/Tartas/frutillas-entera.jpg",
    categoria: "tartas",
    precio: 95,
    stock: 12
  },
  {
    id: "tarta-maracuya",
    titulo: "Tarta de Maracuyá",
    descripcion: "Tarta cremosa con sabor tropical de maracuyá.",
    img: "/img/Tartas/maracuya-entera.jpg",
    categoria: "tartas",
    precio: 90,
    stock: 9
  },
  {
    id: "tarta-peras-almendras",
    titulo: "Tarta de Peras y Almendras",
    descripcion: "Tarta artesanal con peras y almendras.",
    img: "/img/Tartas/peras-almendras.jpg",
    categoria: "tartas",
    precio: 100,
    stock: 8
  },
  {
    id: "brownie",
    titulo: "Brownie",
    descripcion: "Brownie de chocolate intenso, ideal para acompañar café.",
    img: "/img/pequenas-tentaciones/brownie.jpg",
    categoria: "pequenas-tentaciones",
    precio: 25,
    stock: 20
  },
  {
    id: "alfajor-chocolate",
    titulo: "Alfajor de Chocolate",
    descripcion: "Alfajor relleno y cubierto con chocolate.",
    img: "/img/pequenas-tentaciones/alfajor-chocolate.jpg",
    categoria: "pequenas-tentaciones",
    precio: 18,
    stock: 25
  },
  {
    id: "alfajor-nuez",
    titulo: "Alfajor de Nuez",
    descripcion: "Alfajor artesanal con nuez y relleno suave.",
    img: "/img/pequenas-tentaciones/alfajor-nuez.jpg",
    categoria: "pequenas-tentaciones",
    precio: 18,
    stock: 20
  },
  {
    id: "pasta-frolla",
    titulo: "Pasta Frolla",
    descripcion: "Porción dulce artesanal con masa suave y relleno frutal.",
    img: "/img/pequenas-tentaciones/pasta-frolla.jpg",
    categoria: "pequenas-tentaciones",
    precio: 20,
    stock: 15
  },
  {
    id: "bandeja-de-masas",
    titulo: "Bandeja de Masas",
    descripcion: "Selección variada de masas dulces para compartir.",
    img: "/img/pequenas-tentaciones/bandeja-de-masas.jpg",
    categoria: "pequenas-tentaciones",
    precio: 80,
    stock: 10
  }
];

async function seed() {
  console.log("Subiendo productos...");
  try {
    for (const prod of productos) {
      const { id, ...data } = prod;
      const docRef = doc(db, "productos", id);
      await setDoc(docRef, data);
      console.log(`Producto subido: ${data.titulo}`);
    }
    console.log("Carga completada correctamente");
  } catch (error) {
    console.error("Error al subir productos: ", error);
  }
}

seed();
