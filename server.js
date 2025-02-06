// Importation des modules
const express = require("express");
const mysql = require("mysql2");
const app = express();

// Configuration de la base de données
const db = mysql.createConnection({
  host: "localhost", // Modifier si nécessaire
  user: "root", // Modifier selon ton utilisateur
  password: "", // Modifier si nécessaire
  database: "star_visualizer",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données");
});

// Configuration du moteur de vue
app.set("view engine", "ejs");
app.use(express.static("public"));

// Route principale avec tri
app.get("/", (req, res) => {
  let orderBy = req.query.sort || "id";
  let validColumns = ["id", "proper", "spect", "mag", "rv", "dist"];
  if (!validColumns.includes(orderBy)) orderBy = "id";

  let query = `SELECT * FROM stars ORDER BY ${orderBy} ASC`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur serveur");
    }
    res.render("index", { stars: results, orderBy });
  });
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
