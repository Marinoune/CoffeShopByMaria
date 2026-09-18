import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const locationsFile = path.join(__dirname, "..", "data", "locations.json");

router.get("/", (req, res) => {
  fs.readFile(locationsFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading locations" });
    res.json(JSON.parse(data || "[]"));
  });
});

export default router;
