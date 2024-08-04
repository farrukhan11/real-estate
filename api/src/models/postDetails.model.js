import mongoose from "mongoose";

const postDetailSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    utilities: {
      type: String,
      required: false,
    },
    pet: {
      type: String,
      required: false,
    },
    income: {
      type: String,
      required: false,
    },
    size: {
      type: Number,
      required: false,
    },
    school: {
      type: Number,
      required: false,
    },
    bus: {
      type: Number,
      required: false,
    },
    restaurant: {
      type: Number,
      required: false,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const PostDetail = mongoose.model("PostDetail", postDetailSchema);

export default PostDetail;
