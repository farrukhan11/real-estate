import mongoose from "mongoose";

const postDetailsSchema = new mongoose.Schema({
  utilities: {
    type: String,
    required: true,
  },
  pet: {
    type: String,
    required: true,
  },
  income: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  school: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bus: {
    type: Number,
    required: true,
  },
  restaurant: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

export default mongoose.model("PostDetails", postDetailsSchema);
