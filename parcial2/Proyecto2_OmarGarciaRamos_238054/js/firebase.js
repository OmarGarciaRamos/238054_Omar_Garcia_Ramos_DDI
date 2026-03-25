//La verdad nose como funciona esta parte aparete de importar la informacion almacenada en la base de datos,
//todo este codigo me lo dio automaticamente firebase para vincularlo

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCI_yqteYX_hQVBS3K8N1T66YtUkXwHAI4",
  authDomain: "melodify-8b01f.firebaseapp.com",
  projectId: "melodify-8b01f",
  storageBucket: "melodify-8b01f.firebasestorage.app",
  messagingSenderId: "841262116901",
  appId: "1:841262116901:web:cbe1503d7443cbdad78fcc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
