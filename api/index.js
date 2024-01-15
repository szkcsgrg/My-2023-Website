
//////////////////////////////////////////////////////////////////////////////
//Server Imports & Configuration
//////////////////////////////////////////////////////////////////////////////
const express = require("express");
const https = require('https');
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

//Server configuration
const db = mysql.createConnection({
  host: "91.227.139.203",
  //host: "vps.szakacsgergo.com",
  user: "c15224szkcsgrg",
  password: "DBPW0312",
  database: "c15224my2023website",
  port: 3306,
//  database: process.env.DATABASE_DATABASE,
});

const app = express();
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/vps.szakacsgergo.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/vps.szakacsgergo.com/fullchain.pem')
};
const httpsServer = https.createServer(options, app);

httpsServer.keepAliveTimeout = 315360000;

const port =  8800;
httpsServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, HTTPS!');
});

app.use(express.json());
app.set("view engine", "ejs");

//Cors setup
const allowedOrigins = ['https://szakacsgergo.com',
  'https://www.szakacsgergo.com',
  'https://szakacsgergo.com/login',
  'https://www.szakacsgergo.com/login',
  'https://szakacsgergo.com/development',
  'https://www.szakacsgergo.com/development',
  'https://szakacsgergo.com/photography',
  'https://www.szakacsgergo.com/photography',
  'https://szakacsgergo.com/project',
  'https://www.szakacsgergo.com/project', ];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error(`CORS Error: Origin '${origin}' is not allowed.`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));




//File handeling
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
    console.log(req.body);
    console.log(req.files.image1[0].path);
    console.log(req.files.image2[0].path);
    console.log(req.files.image3[0].path);
    console.log(req.files.image4[0].path);
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
console.log(values);
    const sanitizedValues = values.map((value) =>
      value === "undefined" ? null : value
    );

    db.query(q, [sanitizedValues], (err, result) => {
      if (err) return res.json(err);
      return res.json("Project has been created successfully.");
    });
  }
);

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

