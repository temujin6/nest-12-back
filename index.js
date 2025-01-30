const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 8000;

//Middleware
app.use(express.json());
app.use(cors());

// MySQL-тэй холбогдох тохиргоо
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// MySQL-тэй холбогдож байгаа эсэхийг шалгах
db.connect((err) => {
  if (err) {
    console.error("MySQL холбогдсонгүй:", err);
  } else {
    console.log("MySQL-тэй амжилттай холбогдлоо!");
  }
});

app.get("/", (request, response) => {
  res.send("Server ajillaj bn !!!");
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Хэрэглэгч устгагдлаа" });
    }
  });
});

// Сервер эхлүүлэх
app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} дээр ажиллаж байна`);
});
