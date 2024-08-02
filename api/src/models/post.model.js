import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    // type: {
    //   type: String,
    //   enum: ["rent", "buy"], // Transaction types
    //   required: false,
    // },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    longitude: {
      type: String, // Changed from 'longitute' to 'longitude'
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    bedroom: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    property: {
      type: String,
      enum: ["apartment", "house", "land", "condo"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
