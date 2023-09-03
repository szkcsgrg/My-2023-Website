//////////////////////////////////////////////////////////////////////////////
//Server Imports & Configuration
//////////////////////////////////////////////////////////////////////////////
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

//Server configuration
const app = express();
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
});

//Needed to solve error messages.
app.use(express.json());
app.use(cors());

//The default route.
app.get("/", (req, res) => {
  res.json("This is the backend Server");
});

////////////////////////////////////////////////////////////////
//Select from the database.
////////////////////////////////////////////////////////////////

//Select all records from Reviews.
app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM Reviews", (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

//Select only one record.
app.get("/reviews/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Reviews WHERE `id` = ?", [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

//Select all records from Reviews.
app.get("/projectsdevelopment", (req, res) => {
  db.query("SELECT * FROM ProjectsDevelopment", (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
//Select only one record.
app.get("/projectsdevelopment/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM ProjectsDevelopment WHERE `id` = ?",
    [id],
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

////////////////////////////////////////////////////////////////
//Insert into the database.
////////////////////////////////////////////////////////////////

app.post("/developerprojects", (req, res) => {
  // INSERT INTO `my2023website`.`ProjectsDevelopment` (`name`, `date`, `stack`, `description1`, `description2`, `image1`, `image2`, `colorCode`, `href1`, `developmentType`, `position`) VALUES ('Szumrik Marcell', '2022', 'HTML CSS', 'Long long long long long', 'shrt short short', 'test1', 'test2', 'purple', 'szurmik.hu', 'Freelance', '3');
  const q = `INSERT INTO ProjectsDevelopment (name, dateStart, stack, description1, description2, image1, image2, image3, image3, image4, colorCode, href1, href2, developmentType, position, dateEnd) VALUES (?)`;
  const values = [
    req.body.name,
    req.body.dateStart,
    req.body.stack,
    req.body.description1,
    req.body.description2,
    req.body.image1,
    req.body.image2,
    req.body.image3,
    req.body.image4,
    req.body.colorCode,
    req.body.href1,
    req.body.href2,
    req.body.developmentType,
    req.body.position,
    req.body.dateEnd,
  ];

  db.query(q, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json("Project has been created successfully.");
  });
});

////////////////////////////////////////////////////////////////
//Delete from the database.
////////////////////////////////////////////////////////////////
app.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  const q = `DELETE FROM cars WHERE idcars = ?`;

  db.query(q, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json("Car has been updated successfully.");
  });
});

////////////////////////////////////////////////////////////////
//Upadte in the database.
////////////////////////////////////////////////////////////////

app.put("/cars/:id", (req, res) => {
  const id = req.params.id;
  const q =
    "UPDATE cars SET `name` = ?, `model` =?, `evjarat` =? WHERE `idcars` =?";
  const values = [req.body.name, req.body.model, req.body.evjarat, id];

  db.query(q, [...values, id], (err, result) => {
    if (err) return res.json("itt a hiba: " + err);
    return res.json("Car has been deleted successfully.");
  });
});

////////////////////////////////////////////////////////////////
//Server listening.
////////////////////////////////////////////////////////////////

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
