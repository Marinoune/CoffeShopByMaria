import express from "express";
import Order from "../models/order.js";
import User from "../models/user.js";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error(" Nodemailer Transporter Error:", error);
  } else {
    console.log(" Nodemailer ready to send emails!");
  }
});

router.post("/", async (req, res) => {
  try {
    const { items, customer } = req.body;


    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must include items." });
    }

    if (!customer || !customer.name || !customer.name.trim()) {
      return res.status(400).json({ error: "Customer name is required." });
    }

    if (!customer.email || !customer.email.trim()) {
      return res.status(400).json({ error: "Customer email is required." });
    }

    const total = items.reduce(
      (sum, it) => sum + Number(it.price) * Number(it.qty || 1),
      0
    );

  
    const order = await Order.create({
      id: nanoid(10),
      items,
      customer,
      total: Number(total.toFixed(2))
    });

    // Stamp logic
    const updatedUser = await User.findOneAndUpdate(
      { username: customer.name },
      { $inc: { stamps: 1 } },
      { new: true }
    );

    // SEND EMAIL
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customer.email,
        subject: "Order Confirmation - Coffee Shop",
        text: `Hi ${customer.name},\n\nThanks for your order!\n\nOrder ID: ${order.id}\nTotal: $${order.total}\nPhone: ${customer.phone || "Not provided"}\nNotes: ${customer.note || "None"}\n\nWe are preparing it now! please head to the font desk to pay for your order and check out`,
      });
    } catch (emailErr) {
      console.error("Nodemailer error:", emailErr);
    }

  
    res.json({
      ok: true,
      order,
      stamps: updatedUser?.stamps || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;