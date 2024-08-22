//////////////////////////////////////////////////////////////////////////////
//Server Imports & Configuration
//////////////////////////////////////////////////////////////////////////////
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

//Server configuration
const app = express();
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
});

const port = 8800;
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/public/images", express.static("public/images"));
const storage = multer.diskStorage({
  destination: (reg, file, cb) => {
    cb(null, "public/images");
  },
  filename: (reg, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.use("/public/cv", express.static("public/cv"));
const storage2 = multer.diskStorage({
  destination: (reg, file, cb) => {
    cb(null, "public/cv");
  },
  filename: (reg, file, cb) => {
    cb(null, "Gergo Szakacs - CV.pdf");
  },
});

const uploadCV = multer({
  storage: storage2,
});

//The default route.
app.get("/", (req, res) => {
  res.json("This is the backend Server");
});

////////////////////////////////////////////////////////////////
//Select from the database.
////////////////////////////////////////////////////////////////

//Select only the exsisting reviews.
app.get("/reviews", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT reviewWriter, reviewText FROM ProjectsDevelopment WHERE reviewWriter IS NOT NULL",
    [id],
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

//Select all records from.
app.get("/projectsdevelopment", (req, res) => {
  db.query(
    "SELECT * FROM ProjectsDevelopment ORDER BY position asc",
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
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


app.get("/photography/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM Photography WHERE (`id` = ?)",
    [id],
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
})

////////////////////////////////////////////////////////////////
//Insert into the database.
////////////////////////////////////////////////////////////////

app.post(
  "/developerprojects",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
    { name: "image3" },
    { name: "image4" },
  ]),
  (req, res) => {
    //console.log(req.body);
    //console.log(req.files.image1[0].path);
    const q = `INSERT INTO ProjectsDevelopment (name, dateStart, stack, description1, description2, image1, image2, image3, image4, colorCode, href1, href2, developmentType, position, dateEnd, reviewWriter, reviewText) VALUES (?)`;
    const values = [
      req.body.name,
      req.body.dateStart,
      req.body.stack,
      req.body.description1,
      req.body.description2,
      req.files.image1[0].path,
      req.files.image2[0].path,
      req.files.image3[0].path,
      req.files.image4[0].path,
      req.body.colorCode,
      req.body.href1,
      req.body.href2 || null,
      req.body.developmentType,
      req.body.position,
      req.body.dateEnd || null,
      req.body.reviewWriter || null,
      req.body.reviewText || null,
    ];
    const sanitizedValues = values.map((value) =>
      value === "undefined" ? null : value
    );

    db.query(q, [sanitizedValues], (err, result) => {
      if (err) return res.json(err);
      return res.json("Project has been created successfully.");
    });
  }
);

app.post("/addPhoto", upload.fields([
  { name: "cover1" },
  { name: "cover2" },
  { name: "cover3" },
  { name: "image4" },
  { name: "image5" },
  { name: "image6" },
  { name: "image7" },
  { name: "image8" },
  { name: "image9" },
])
,(req, res) => {
  console.log(req.body);
  console.log(req.files);
  const q = `INSERT INTO Photography (name, topic, cover1, cover2, cover3, image4, image5, image6, image7, image8, image9, clickable, date) VALUES (?)`;
  const values = [
    req.body.name, 
    req.body.topic,
    req.files.cover1?.[0]?.path || null,
    req.files.cover2?.[0]?.path || null,
    req.files.cover3?.[0]?.path || null,
    req.files.image4?.[0]?.path || null,
    req.files.image5?.[0]?.path || null,
    req.files.image6?.[0]?.path || null,
    req.files.image7?.[0]?.path || null,
    req.files.image8?.[0]?.path || null,
    req.files.image9?.[0]?.path || null,
    req.body.clickable,
    req.body.date
  ];


  db.query(q, [values], (err, result) => {
     if (err) return res.json(err);
     return res.json("Photo has been uploaded succesfully.")
  });
});


app.post("/cv", uploadCV.single("cv"), (req, res) => {
  console.log(req.file);
});

////////////////////////////////////////////////////////////////
//Delete from the database.
////////////////////////////////////////////////////////////////
app.delete("/developerprojects/:id", (req, res) => {
  const id = req.params.id;
  const q_1 = `SELECT image1, image2, image3, image4 FROM ProjectsDevelopment WHERE id = ?`;
  db.query(q_1, [id], (err, result) => {
    if (err) return res.json(err);
    const imagePath1 = result[0].image1;
    if (imagePath1) {
      fs.unlink(imagePath1, (unlinkErr) => {
        if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
        else console.log("Image1 file deleted successfully:", imagePath1);
      });
    }
    const imagePath2 = result[0].image2;
    if (imagePath2) {
      fs.unlink(imagePath2, (unlinkErr) => {
        if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
        else console.log("Image2 file deleted successfully:", imagePath2);
      });
    }
    const imagePath3 = result[0].image3;
    if (imagePath3) {
      fs.unlink(imagePath3, (unlinkErr) => {
        if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
        else console.log("Image3 file deleted successfully:", imagePath3);
      });
    }
    const imagePath4 = result[0].image4;
    if (imagePath4) {
      fs.unlink(imagePath4, (unlinkErr) => {
        if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
        else console.log("Image4 file deleted successfully:", imagePath4);
      });
    }

    const q_2 = `DELETE FROM ProjectsDevelopment WHERE id = ?`;
    db.query(q_2, [id], (err, result) => {
      if (err) return res.json(err);
      return res.json("Project has been deleted successfully.");
    });
  });
});
app.delete("/deletePhoto/:id", (req, res) => { 
  const alt = req.body.alt;
  const id = req.params.id;

  const q_1 = `SELECT cover1, cover2, cover3, image4, image5, image6, image7, image8, image9 FROM Photography WHERE id = ?`;
  db.query(q_1, [id], (err, result) => {
    if (err) return res.json(err);
    const paths = [
      result[0].cover1,
      result[0].cover2,
      result[0].cover3,
      result[0].image4,
      result[0].image5,
      result[0].image6,
      result[0].image7,
      result[0].image8,
      result[0].image9,
    ];

    paths.forEach((path, index) => {
      if (path && alt === path) {
        fs.unlink(path, (unlinkErr) => {
          if (unlinkErr) console.log(`Error deleting image file ${index + 1}:`, unlinkErr);
          else console.log(`Image file ${index + 1} deleted successfully:`, path);
        });
      }
    })
  });

  const q_2 = `Delete FROM Photography WHERE id = ? AND VALUES (?)`;
  db.query(q_2, [id, alt], (err, result) => {
    if (err) return res.json(err);
    return res.json("Photo has been deleted successfully.");
  });
})

// app.delete("/photography/:id", (req, res) => {

////////////////////////////////////////////////////////////////
//Upadte in the database.
////////////////////////////////////////////////////////////////

app.put(
  "/updateDeveloperProject/:id",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
    { name: "image3" },
    { name: "image4" },
  ]),
  (req, res) => {
    const id = req.params.id;
    const values = [
      req.body.name,
      req.body.dateStart,
      req.body.stack,
      req.body.description1,
      req.body.description2,
      req.body.colorCode,
      req.body.href1,
      req.body.href2 || null,
      req.body.developmentType,
      req.body.position,
      req.body.dateEnd || null,
      req.body.reviewWriter || null,
      req.body.reviewText || null,
    ];

    const q_1 = `SELECT image1, image2, image3, image4 FROM ProjectsDevelopment WHERE id = ?`;
    db.query(q_1, [id], (err, result) => {
      if (err) return res.json(err);
      const imagePath1 = result[0].image1;
      const imagePath2 = result[0].image2;
      const imagePath3 = result[0].image3;
      const imagePath4 = result[0].image4;
      if (req.files.image1) {
        values.push(req.files.image1[0].path);
        if (imagePath1) {
          fs.unlink(imagePath1, (unlinkErr) => {
            if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
            else console.log("Image1 file deleted successfully:", imagePath1);
          });
        }
      } else {
        console.log(imagePath1 + " has been added to the values array");
        values.push(imagePath1);
      }
      if (req.files.image2) {
        values.push(req.files.image2[0].path);
        if (imagePath2) {
          fs.unlink(imagePath2, (unlinkErr) => {
            if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
            else console.log("Image2 file deleted successfully:", imagePath2);
          });
        }
      } else {
        console.log(imagePath2 + " has been added to the values array");
        values.push(imagePath2);
      }
      if (req.files.image3) {
        values.push(req.files.image3[0].path);
        if (imagePath3) {
          fs.unlink(imagePath3, (unlinkErr) => {
            if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
            else console.log("Image3 file deleted successfully:", imagePath3);
          });
        }
      } else {
        console.log(imagePath3 + " has been added to the values array");
        values.push(imagePath3);
      }
      if (req.files.image4) {
        values.push(req.files.image4[0].path);
        if (imagePath4) {
          fs.unlink(imagePath4, (unlinkErr) => {
            if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
            else console.log("Image4 file deleted successfully:", imagePath4);
          });
        }
      } else {
        console.log(imagePath4 + " has been added to the values array");
        values.push(imagePath4);
      }
      const q_2 =
        "UPDATE ProjectsDevelopment SET `name` = ?, `dateStart` = ?, `stack` = ?, `description1` = ?, `description2` = ?, `colorCode` = ?, `href1` = ?, `href2` = ?, `developmentType` = ?, `position` = ?, `dateEnd` = ?, `reviewWriter` = ?, `reviewText` = ?, `image1` = ?, `image2` = ?, `image3` = ?, `image4` = ? WHERE (`id` = ?)";
      const sanitizedValues = values.map((value) =>
        value === "undefined" ? null : value
      );
      db.query(q_2, [...sanitizedValues, id], (err, result) => {
        if (err) return res.json("Error: " + err);
        return res.json("Project has been updated successfully.");
      });
    });
  }
);

app.put("/updatePhoto/:id", upload.fields([
  { name: "cover1" },
  { name: "cover2" },
  { name: "cover3" },
  { name: "image4" },
  { name: "image5" },
  { name: "image6" },
  { name: "image7" },
  { name: "image8" },
  { name: "image9" },
]), (req, res) => {


  const id = req.params.id;
  const values = [ req.body.name, req.body.topic, req.body.clickable, req.body.date];

  const q_1 = `SELECT cover1, cover2, cover3, image4, image5, image6, image7, image8, image9 FROM Photography WHERE id = ?`;
  db.query(q_1, [id], (err, result) => {
    if (err) return res.json(err);
    const cover1Path = result[0].cover1;
    const cover2Path = result[0].cover2;
    const cover3Path = result[0].cover3;
    const image4Path = result[0].image4;
    const image5Path = result[0].image5;
    const image6Path = result[0].image6;
    const image7Path = result[0].image7;
    const image8Path = result[0].image8;
    const image9Path = result[0].image9;


    if (req.files.cover1) {
      values.push(req.files.cover1[0].path);
      if (cover1Path) {
        fs.unlink(cover1Path, (unlinkErr) => {
          if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
          else console.log("Image1 file deleted successfully:", cover1Path);
        });
      }
    } else {
      console.log(cover1Path + " has been added to the values array");
      values.push(cover1Path);
    }
    if (req.files.cover2) {
      values.push(req.files.cover2[0].path);
      if (cover2Path) {
        fs.unlink(cover2Path, (unlinkErr) => {
          if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
          else console.log("Image2 file deleted successfully:", cover2Path);
        });
      }
    } else {
      console.log(cover2Path + " has been added to the values array");
      values.push(cover2Path);
    }
    if (req.files.cover3) {
      values.push(req.files.cover3[0].path);
      if (cover3Path) {
        fs.unlink(cover3Path, (unlinkErr) => {
          if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
          else console.log("Image3 file deleted successfully:", cover3Path);
        });
      }
    } else {
      console.log(cover3Path + " has been added to the values array");
      values.push(cover3Path);
    }
    if (req.files.image4) {
      values.push(req.files.image4[0].path);
      if (image4Path) {
        fs.unlink(image4Path, (unlinkErr) => {
          if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
          else console.log("Image4 file deleted successfully:", image4Path);
        });
      }
    } else {
      console.log(image4Path + " has been added to the values array");
      values.push(image4Path);
    }
    if (req.files.image5) {
      values.push(req.files.image5[0].path);
      if (image5Path) {
        fs.unlink(image5Path, (unlinkErr) => {
          if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
          else console.log("Image5 file deleted successfully:", image5Path);
        });
      }
    } else {
      console.log(image5Path + " has been added to the values array");
      values.push(image5Path);
    }
    if (req.files.image6) {
      values.push(req.files.image6[0].path);
      if (image6Path) {
        fs.unlink(image6Path, (unlinkErr) => {
          if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
          else console.log("Image6 file deleted successfully:", image6Path);
        });
      }
    } else {
      console.log(image6Path + " has been added to the values array");
      values.push(image6Path);
    }
    if (req.files.image7) {
      values.push(req.files.image7[0].path);
      if (image7Path) {
        fs.unlink(image7Path, (unlinkErr) => {
          if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
          else console.log("Image7 file deleted successfully:", image7Path);
        });
      }
    } else {
      console.log(image7Path + " has been added to the values array");
      values.push(image7Path);
    }
    if (req.files.image8) {
      values.push(req.files.image8[0].path);
      if (image8Path) {
        fs.unlink(image8Path, (unlinkErr) => {
          if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
          else console.log("Image8 file deleted successfully:", image8Path);
        });
      }
    } else {
      console.log(image8Path + " has been added to the values array");
      values.push(image8Path);
    }
    if (req.files.image9) {
      values.push(req.files.image9[0].path);
      if (image9Path) {
        fs.unlink(image9Path, (unlinkErr) => {
          if (unlinkErr) console.log("Error deleting image file:", unlinkErr);
          else console.log("Image9 file deleted successfully:", image9Path);
        });
      }
    } else {
      console.log(image9Path + " has been added to the values array");
      values.push(image9Path);
    }

    console.log(values);
    const q_2 = "UPDATE Photography SET `name` = ?, `topic` = ?, `cover1` = ?, `cover2` = ?, `cover3` = ?, `image4` = ?, `image5` = ?, `image6` = ?, `image7` = ?, `image8` = ?, `image9` = ?, `clickable` = ?, `date` = ? WHERE (`id` = ?)";
      const sanitizedValues = values.map((value) =>
        value === "undefined" ? null : value
      );
      db.query(q_2, [...sanitizedValues, id], (err, result) => {
        if (err) return res.json("Error: " + err);
        return res.json("Project has been updated successfully.");
      });

  });
});

////////////////////////////////////////////////////////////////
//Server listening.
////////////////////////////////////////////////////////////////

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
