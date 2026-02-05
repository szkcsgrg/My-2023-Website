//////////////////////////////////////////////////////////////////////////////
//Server Imports & Configuration
//////////////////////////////////////////////////////////////////////////////
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { join } = require('path');
const fs = require("fs");
const { createWriteStream, unlinkSync } = require('fs');
const { tmpdir } = require('os');
const bodyParser = require('body-parser');
const archiver = require('archiver');
const axios = require('axios');

require("dotenv").config();

const {Storage} = require('@google-cloud/storage');
const strg = new Storage({
  keyFilename: path.join(__dirname, 'key.json')
})
const bucketName="storage-bucket-for-photography"
const bucket = strg.bucket(bucketName)


//Server configuration
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  port: 3306,
});

const app = express();
const port = 8800;

app.use(express.json());
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  'https://www.szakacsgergo.com/project',
  'http://localhost:3000',
  'http://localhost:3000/photography',
  'http://localhost:3000/client',
 ];
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


app.get("/clientsphotography/:folder", async (req, res) => {
  const folderName = req.params.folder;

  try {
    const [files] = await bucket.getFiles({
      prefix: `${folderName}/small-`
    });

    const filesWithSignedUrls = await Promise.all(
      files.map(async (file) => {
        const signedUrl = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
        });

        return {
        ...file.metadata,
          name: file.name,
          signedUrl: signedUrl,
        };
      })
    );

    return res.json(filesWithSignedUrls);
  } catch (error) {
    console.error("Error fetching files and generating signed URLs:", error);
    res.status(500).send("Error fetching images.");
  }
});

app.get("/download", async (req, res) => {
  const { fileName, folder } = req.query;

  if (!fileName || !folder) {
    return res.status(400).send('File name and folder are required');
  }

  try {
    const largeFileName = `${fileName.replace('small-', 'large-')}`
    const filePath = `${folder}/large/${largeFileName}`;
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 604800,
    };

    const [url] = await strg
      .bucket(bucketName)
      .file(filePath)
      .getSignedUrl(options);

      res.json({ url });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error generating signed URL');
  }
});

app.get('/download-all', async (req, res) => {
  const { folder } = req.query;

  if (!folder) {
    return res.status(400).send('Folder is required');
  }

  try {
    const bucket = strg.bucket(bucketName);
    const file = bucket.file(`${folder}/large/large.zip`);

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000,
    });

    res.json({ downloadUrl: url });

  } catch (error) {
    console.error('Error generating signed URL:', error);
    res.status(500).send('Error generating download link');
  }
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

app.get("/clients", (req, res) => {
  db.query(
    "SELECT * FROM PhotographyProjects",
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
})

app.get("/client/:projectid", (req, res) => {
  const projectid = req.params.projectid;
  db.query(
    "SELECT * FROM PhotographyProjects WHERE (`projectid` = ?)",
    [projectid],
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
})


//Portraits
app.get("/portraits", (req, res) => {
  db.query(
    "SELECT * FROM Photography WHERE topic='portraits'",
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});
//Weddings
app.get("/weddings", (req, res) => {
  db.query(
    "SELECT * FROM Photography WHERE topic='weddings'",
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});
//Products
app.get("/products", (req, res) => {
  db.query(
    "SELECT * FROM Photography WHERE topic='products'",
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});
//Lifestyle
app.get("/lifestyle", (req, res) => {
  db.query(
    "SELECT * FROM Photography WHERE topic='lifestyle'",
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});
//Any
app.get("/photos/:option", (req, res) => {
  const selectedOption = req.params.option;
  const query = "SELECT * FROM Photography WHERE topic = ?";
  db.query(query, [selectedOption], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log(result);
    return res.json(result);
  });
});
//ID
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

app.post("/developerprojects",
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

app.post("/addClient", upload.none(), (req, res) => {
  req.body.clickable = req.body.clickable === "true" ? 1 : 0;
  console.log(req.body);

  const q = `INSERT INTO PhotographyProjects (projectid, downloadable, password) VALUES (?)`;
  const values = [
    req.body.projectid,
    req.body.clickable,
    req.body.password,
  ];

  db.query(q, [values], (err, result) => {
     if (err) return res.json(err);
     return res.json("Client has been uploaded succesfully.")
  });
});

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

app.delete("/photography/:id", (req, res) => {
  const id = req.params.id;

  const q_1 = `SELECT path FROM Photography WHERE id = ?`;

  db.query(q_1, [id], (err, result) => {
    if (err) {
      console.error("Error retrieving photo path:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Photo not found" });
    }

    const imagePath = result[0].path;

    if (imagePath) {
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting image file:", unlinkErr);
        } else {
          console.log("Image file deleted successfully:", imagePath);
        }
      });
    }

    const q_2 = `DELETE FROM Photography WHERE id = ?`;

    db.query(q_2, [id], (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error("Error deleting photo from the database:", deleteErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.json("Photo has been deleted successfully.");
    });
  });
});

app.post("/deletePhoto/:id/:path", (req, res) => {
console.log(req.params)
  const alt = req.params.path;
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


   const q_2 = `
            UPDATE Photography
            SET
                cover1 = CASE WHEN cover1 = ? THEN NULL ELSE cover1 END,
                cover2 = CASE WHEN cover2 = ? THEN NULL ELSE cover2 END,
                cover3 = CASE WHEN cover3 = ? THEN NULL ELSE cover3 END,
                image4 = CASE WHEN image4 = ? THEN NULL ELSE image4 END,
                image5 = CASE WHEN image5 = ? THEN NULL ELSE image5 END,
                image6 = CASE WHEN image6 = ? THEN NULL ELSE image6 END,
                image7 = CASE WHEN image7 = ? THEN NULL ELSE image7 END,
                image8 = CASE WHEN image8 = ? THEN NULL ELSE image8 END,
                image9 = CASE WHEN image9 = ? THEN NULL ELSE image9 END
            WHERE id = ?
        `;
        db.query(q_2, [alt, alt, alt, alt, alt, alt, alt, alt, alt, id], (err, result) => {
            if (err) return res.json(err);
            return res.json("Photo has been deleted successfully.");
        });
})


////////////////////////////////////////////////////////////////
//Upadte in the database.
////////////////////////////////////////////////////////////////

app.put( "/updateDeveloperProject/:id",
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


    const q_2 = "UPDATE Photography SET `name` = ?, `topic` = ?, `clickable` = ?, `date` = ?, `cover1` = ?, `cover2` = ?, `cover3` = ?, `image4` = ?, `image5` = ?, `image6` = ?, `image7` = ?, `image8` = ?, `image9` = ? WHERE (`id` = ?)";
      const sanitizedValues = values.map((value) =>
        value === "undefined" ? null : value
      );
      db.query(q_2, [...sanitizedValues, id], (err, result) => {
        if (err) return res.json("Error: " + err);
        return res.json("Project has been updated successfully.");
      });

  });
});

app.put("updatePhotographyClient/:id", (req, res) => {
  const id = req.params.id;
  const values = [req.body.projectid, req.body.image, req.body.marked, req.body.comment];

  const q_1 = "Select image FROM PhotographyProjectsData WHERE id = ?";
  db.query(q_1, [id], (err, result) => {
    if (err) return res.json(err);
    if (result[0].image) {
      values.push(result[0].image);
      const q_2 = "UPDATE PhotographyProjectsData SET `projectid` = ?, `image` = ?, `marked` = ?, `comment` = ? WHERE (`id` = ?)";
      db.query(q_2, [...values, id], (err, result) => {
        if (err) return res.json("Error: " + err);
        return res.json("Client has been updated successfully.");
      });
    } else {
      const q_3 = "INSERT INTO PhotographyProjectsData (projectid, image, marked, comment) VALUES (?)";
      db.query(q_3, [values], (err, result) => {
        if (err) return res.json("Error: " + err);
        return res.json("Client has been created successfully.");
      });
    }
  }
)});


////////////////////////////////////////////////////////////////
//Server listening.
////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
