import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const menuFile = path.join(__dirname, "..", "data", "menu.json");

router.get("/", (req, res) => {
  fs.readFile(menuFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading menu" });
    res.json(JSON.parse(data || "[]"));
  });
});

export default router;
