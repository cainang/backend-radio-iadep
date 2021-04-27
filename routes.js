const express = require("express");
const firebase = require("firebase-admin");
require("./firebase/base");

// Creates a client

const routes = express.Router();

const db = firebase.firestore();

//NÃO VAI TER ROTA DE POST, FAVOR MUDAR INFORMAÇÕES PELO FIREBASE

// ------------------------- Backend ------------------------------

routes.get("/cultos", async (req, res) => {
  var cultosData = []; //Array com todos os cultos cadastrados

  try {
    // Requisição ao banco de dados, buscar os membros cadastrados
    const snapshot = await db.collection("cultos").get();
    // Colocando os dados retornados dentro de um array
    snapshot.forEach((doc) => {
      cultosData.push(doc.data());
    });
  } catch (err) {
    return res.json(err);
  }

  return res.json(cultosData);
});

routes.post("/cultos/duplicate/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Requisição ao banco de dados, buscar os membros cadastrados
    const snapshot = await db
      .collection("cultos")
      .where("id", "==", Number("1"))
      .get();
    snapshot.forEach(async (doc) => {
      await db.collection("cultos").doc(`${id}`).set(doc.data());
    });
  } catch (err) {
    return res.json(err);
  }

  return res.json("ok");
});

routes.get("/info", async (req, res) => {
  var infoData = []; //Array com todos os info cadastrados

  try {
    // Requisição ao banco de dados, buscar os membros cadastrados
    const snapshot = await db.collection("info").get();
    // Colocando os dados retornados dentro de um array
    snapshot.forEach((doc) => {
      infoData.push(doc.data());
    });
  } catch (err) {
    return res.json(err);
  }

  return res.json(infoData);
});

module.exports = routes;
