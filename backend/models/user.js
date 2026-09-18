import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  stamps: { type: Number, default: 0 }
});

export default mongoose.model("User", userSchema);