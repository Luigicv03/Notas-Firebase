import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAKjochjqODALx36Xx_XgihnltZf-yvTrI",
    authDomain: "bloc-notas-luigi-dcaa9.firebaseapp.com",
    projectId: "bloc-notas-luigi-dcaa9",
    storageBucket: "bloc-notas-luigi-dcaa9.firebasestorage.app",
    messagingSenderId: "545078969382",
    appId: "1:545078969382:web:d0258b291515abfd6f92e7"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usarás
export const db = getFirestore(app); // Firestore (base de datos)
export const auth = getAuth(app); // Autenticación