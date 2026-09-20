import express from "express";
import cors from "cors";
import menuRoutes from "./routes/menu.js";
import locationRoutes from "./routes/locations.js";
import createOrderRoutes from "./routes/orders.js";
import path from "path";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./models/user.js";
import { connectDB } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({
  origin: '*', // Allows all origins, or replace '*' with 'https://your-frontend.vercel.app'
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.json());


connectDB();

app.get("/", (req, res) => {
  res.send("☕ Coffee backend API is running!");
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  await User.create({
    username,
    password: hashedPassword,
    stamps: 0
  });

  res.json({ message: "User registered successfully" });
});


app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({
    token,
    user: {
      username: user.username,
      stamps: user.stamps
    }
  });
});


app.get("/api/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    res.json({ message: `Welcome ${decoded.username}!` });
  });
});

app.use("/images", express.static(path.join(process.cwd(), "public/images")));


app.use("/api/menu", menuRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/orders", createOrderRoutes); 

app.listen(PORT, () => {
  console.log(`☕ Coffee backend running at http://localhost:${PORT}`);
});
export default app;