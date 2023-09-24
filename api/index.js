//////////////////////////////////////////////////////////////////////////////
//Server Imports & Configuration
//////////////////////////////////////////////////////////////////////////////
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

//Server configuration
const app = express();
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
});

app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

//The default route.
app.get("/", (req, res) => {
  res.json("This is the backend Server");
});

////////////////////////////////////////////////////////////////
//Select from the database.
////////////////////////////////////////////////////////////////

app.get("/reviews", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM ProjectsDevelopment WHERE reviewWriter is not Null;",
    [id],
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

//Select all records from.
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
    "SELECT * FROM ProjectsDevelopment WHERE (`id` = ?)",
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

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../api/uploads"); // Specify your upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post(
  "/developerprojects",
  upload.array(["image1", "image2", "image3", "image4"]),
  (req, res) => {
    console.log("Received request with body:", req.body);
    console.log("Received files:", req.files);
    const images = req.files.map((file) => file.path);
    const q = `INSERT INTO ProjectsDevelopment (name, dateStart, stack, description1, description2, image1, image2, image3, image3, image4, colorCode, href1, href2, developmentType, position, dateEnd) VALUES (?)`;
    const values = [
      req.body.name,
      req.body.dateStart,
      req.body.stack,
      req.body.description1,
      req.body.description2,
      images[0],
      images[1],
      images[2],
      images[3],
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
  }
);

////////////////////////////////////////////////////////////////
//Delete from the database.
////////////////////////////////////////////////////////////////
app.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  const q = `DELETE FROM cars WHERE idcars = ?`;

  db.query(q, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json("Project has been deleted successfully.");
  });
});

////////////////////////////////////////////////////////////////
//Upadte in the database.
////////////////////////////////////////////////////////////////

app.put("/updateDeveloperProject/:id", (req, res) => {
  const id = req.params.id;
  const q =
    "UPDATE ProjectsDevelopment SET `name` = ?, `dateStart` = ?, `stack` = ?, `description1` = ?, `description2` = ?, `image1` = ?, `image2` = ?, `image3` = ?, `image4` = ?, `colorCode` = ?, `href1` = ?, `href2` = ?, `developmentType` = ?, `position` = ?, `dateEnd` = ? WHERE (`id` = ?)";

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

  db.query(q, [...values, id], (err, result) => {
    if (err) return res.json("Error: " + err);
    return res.json("Project has been updated successfully.");
  });
});

////////////////////////////////////////////////////////////////
//Server listening.
////////////////////////////////////////////////////////////////

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
