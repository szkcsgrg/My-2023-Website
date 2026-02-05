#!/usr/bin/env node
/**
 * Migration script: updates MySQL paths to point to already-converted WebP images.
 * (Image conversion already completed — this only fixes DB paths.)
 *
 * Usage:
 *   node scripts/migrate-images.js            # run migration
 *   node scripts/migrate-images.js --dry-run   # preview changes without writing
 */

const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const DRY_RUN = process.argv.includes("--dry-run");

function toWebPPath(dbPath) {
  if (!dbPath) return null;
  // Already migrated
  if (dbPath.endsWith("_medium.webp")) return null;
  // Replace extension with _medium.webp
  const ext = path.extname(dbPath);
  return dbPath.replace(ext, "_medium.webp");
}

async function main() {
  console.log(`\n=== DB Path Migration ${DRY_RUN ? "(DRY RUN)" : ""} ===\n`);

  const db = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    port: 3306,
  });
  console.log("Connected to MySQL.\n");

  // Widen columns first so the new paths fit
  console.log("--- Widening image columns ---\n");
  const alterStatements = [
    "ALTER TABLE ProjectsDevelopment MODIFY image1 VARCHAR(255)",
    "ALTER TABLE ProjectsDevelopment MODIFY image2 VARCHAR(255)",
    "ALTER TABLE ProjectsDevelopment MODIFY image3 VARCHAR(255)",
    "ALTER TABLE ProjectsDevelopment MODIFY image4 VARCHAR(255)",
    "ALTER TABLE Photography MODIFY cover1 VARCHAR(255)",
    "ALTER TABLE Photography MODIFY cover2 VARCHAR(255)",
    "ALTER TABLE Photography MODIFY cover3 VARCHAR(255)",
    "ALTER TABLE Photography MODIFY image4 VARCHAR(255)",
    "ALTER TABLE Photography MODIFY image5 VARCHAR(255)",
    "ALTER TABLE Photography MODIFY image6 VARCHAR(255)",
    "ALTER TABLE Photography MODIFY image7 VARCHAR(255)",
    "ALTER TABLE Photography MODIFY image8 VARCHAR(255)",
    "ALTER TABLE Photography MODIFY image9 VARCHAR(255)",
  ];
  for (const sql of alterStatements) {
    console.log(`  ${sql}`);
    if (!DRY_RUN) await db.query(sql);
  }
  console.log("");

  // Update ProjectsDevelopment paths
  console.log("--- Updating ProjectsDevelopment paths ---\n");
  const devCols = ["image1", "image2", "image3", "image4"];
  const [devRows] = await db.query("SELECT id, image1, image2, image3, image4 FROM ProjectsDevelopment");
  for (const row of devRows) {
    const updates = {};
    for (const col of devCols) {
      const newPath = toWebPPath(row[col]);
      if (newPath) updates[col] = newPath;
    }
    if (Object.keys(updates).length > 0) {
      const setClauses = Object.keys(updates).map((c) => `\`${c}\` = ?`).join(", ");
      const vals = Object.values(updates);
      console.log(`  id=${row.id}: ${JSON.stringify(updates)}`);
      if (!DRY_RUN) {
        await db.query(`UPDATE ProjectsDevelopment SET ${setClauses} WHERE id = ?`, [...vals, row.id]);
      }
    }
  }

  // Update Photography paths
  console.log("\n--- Updating Photography paths ---\n");
  const photoCols = ["cover1", "cover2", "cover3", "image4", "image5", "image6", "image7", "image8", "image9"];
  const [photoRows] = await db.query("SELECT id, cover1, cover2, cover3, image4, image5, image6, image7, image8, image9 FROM Photography");
  for (const row of photoRows) {
    const updates = {};
    for (const col of photoCols) {
      const newPath = toWebPPath(row[col]);
      if (newPath) updates[col] = newPath;
    }
    if (Object.keys(updates).length > 0) {
      const setClauses = Object.keys(updates).map((c) => `\`${c}\` = ?`).join(", ");
      const vals = Object.values(updates);
      console.log(`  id=${row.id}: ${JSON.stringify(updates)}`);
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
