#!/usr/bin/env node
/**
 * Migration script: converts existing images to WebP variants and updates MySQL paths.
 *
 * Usage:
 *   node scripts/migrate-images.js            # run migration
 *   node scripts/migrate-images.js --dry-run   # preview changes without writing
 *
 * Run inside Docker:
 *   docker exec -it personal-api node scripts/migrate-images.js
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const DRY_RUN = process.argv.includes("--dry-run");
const IMAGES_DIR = path.join(__dirname, "..", "public", "images");

async function convertToWebP(originalPath) {
  const ext = path.extname(originalPath);
  const basePath = originalPath.replace(ext, "");

  const variants = [
    { suffix: "_thumb", width: 400, quality: 75 },
    { suffix: "_medium", width: 800, quality: 80 },
    { suffix: "_full", width: null, quality: 85 },
  ];

  for (const v of variants) {
    const outputPath = `${basePath}${v.suffix}.webp`;
    if (DRY_RUN) {
      console.log(`  [dry-run] Would create: ${outputPath}`);
      continue;
    }
    let pipeline = sharp(originalPath);
    if (v.width) {
      pipeline = pipeline.resize(v.width, null, { withoutEnlargement: true });
    }
    await pipeline.webp({ quality: v.quality }).toFile(outputPath);
    console.log(`  Created: ${outputPath}`);
  }

  if (!DRY_RUN) {
    fs.unlinkSync(originalPath);
    console.log(`  Deleted original: ${originalPath}`);
  } else {
    console.log(`  [dry-run] Would delete original: ${originalPath}`);
  }

  return `${basePath}_medium.webp`;
}

async function main() {
  console.log(`\n=== Image Migration Script ${DRY_RUN ? "(DRY RUN)" : ""} ===\n`);

  // Connect to MySQL
  const db = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    port: 3306,
  });
  console.log("Connected to MySQL.\n");

  // Collect all image paths from the images directory
  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter((f) =>
    /\.(png|jpg|jpeg|gif)$/i.test(f)
  );

  console.log(`Found ${imageFiles.length} image(s) to convert.\n`);

  // Build a map: original relative path -> new _medium.webp relative path
  const pathMap = {}; // { "public/images/foo.png": "public/images/foo_medium.webp" }

  for (const file of imageFiles) {
    const fullPath = path.join(IMAGES_DIR, file);
    const relativePath = `public/images/${file}`;
    console.log(`Converting: ${relativePath}`);
    try {
      const newRelative = await convertToWebP(fullPath);
      // convertToWebP returns an absolute-ish path; we need the relative one
      const newRelativePath = `public/images/${path.basename(newRelative)}`;
      pathMap[relativePath] = newRelativePath;
      // Also handle backslash paths (Windows compat, just in case)
      pathMap[relativePath.replace(/\//g, "\\")] = newRelativePath;
    } catch (err) {
      console.error(`  ERROR converting ${file}:`, err.message);
    }
  }

  console.log(`\n--- Updating database paths ---\n`);

  // Update ProjectsDevelopment table
  const devImageCols = ["image1", "image2", "image3", "image4"];
  const [devRows] = await db.query("SELECT id, image1, image2, image3, image4 FROM ProjectsDevelopment");
  for (const row of devRows) {
    const updates = {};
    for (const col of devImageCols) {
      if (row[col] && pathMap[row[col]]) {
        updates[col] = pathMap[row[col]];
      }
    }
    if (Object.keys(updates).length > 0) {
      const setClauses = Object.keys(updates).map((c) => `\`${c}\` = ?`).join(", ");
      const vals = Object.values(updates);
      console.log(`ProjectsDevelopment id=${row.id}: ${JSON.stringify(updates)}`);
      if (!DRY_RUN) {
        await db.query(`UPDATE ProjectsDevelopment SET ${setClauses} WHERE id = ?`, [...vals, row.id]);
      }
    }
  }

  // Update Photography table
  const photoCols = ["cover1", "cover2", "cover3", "image4", "image5", "image6", "image7", "image8", "image9"];
  const [photoRows] = await db.query("SELECT id, cover1, cover2, cover3, image4, image5, image6, image7, image8, image9 FROM Photography");
  for (const row of photoRows) {
    const updates = {};
    for (const col of photoCols) {
      if (row[col] && pathMap[row[col]]) {
        updates[col] = pathMap[row[col]];
      }
    }
    if (Object.keys(updates).length > 0) {
      const setClauses = Object.keys(updates).map((c) => `\`${c}\` = ?`).join(", ");
      const vals = Object.values(updates);
      console.log(`Photography id=${row.id}: ${JSON.stringify(updates)}`);
      if (!DRY_RUN) {
        await db.query(`UPDATE Photography SET ${setClauses} WHERE id = ?`, [...vals, row.id]);
      }
    }
  }

  await db.end();
  console.log(`\n=== Migration ${DRY_RUN ? "(DRY RUN) " : ""}complete! ===\n`);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
