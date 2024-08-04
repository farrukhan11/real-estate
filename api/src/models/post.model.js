import mongoose from "mongoose";

// Define enums
const TypeEnum = ["buy", "rent"];
const PropertyEnum = ["apartment", "house", "condo", "land"];

// Define the schema
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
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
    },
    bedroom: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: TypeEnum,
      required: true,
    },
    property: {
      type: String,
      enum: PropertyEnum,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostDetail",
      required: false,
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SavedPost",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

// Create the model
const Post = mongoose.model("Post", postSchema);

export default Post;
