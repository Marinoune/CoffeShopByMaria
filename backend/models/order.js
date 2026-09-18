import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: Array,
  customer: Object,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);