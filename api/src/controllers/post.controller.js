import Post from "../models/post.model.js";

const getPosts = async (req, res) => {
  const query = req.query;
  console.log(query);

  // Build query filter object conditionally
  const filter = {};

  if (query.city) filter.city = query.city;
  if (query.type) filter.type = query.type;
  if (query.property) filter.property = query.property;
  if (query.bedroom) filter.bedroom = parseInt(query.bedroom);
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = parseInt(query.minPrice);
    if (query.maxPrice) filter.price.$lte = parseInt(query.maxPrice);
  }

  try {
    // Fetch real estate posts from the database
    const realEstatePosts = await Post.find(filter);
    console.log(realEstatePosts);
    if (realEstatePosts.length === 0) {
      console.log("No real estate posts found"); // Corrected the console log
      return res.status(404).json({
        message: "No real estate posts found",
      });
    }

    res.status(200).json({
      message: "Real estate posts fetched successfully",
      data: realEstatePosts,
    });
  } catch (error) {
    console.error("Error fetching real estate posts:", error.message);
    res.status(500).json({
      message: "Error fetching real estate posts",
      error: error.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const realEstatePost = await Post.findById(postId);

    if (!realEstatePost) {
      return res.status(404).json({
        message: "Real estate post not found",
      });
    }

    res.status(200).json({
      message: "Real estate post fetched successfully",
      data: realEstatePost,
    });
  } catch (error) {
    console.error("Error fetching real estate post:", error);
    res.status(500).json({
      message: "Error fetching real estate post",
      error: error.message,
    });
  }
};

const addPost = async (req, res) => {
  console.log("req recived");
  const body = req.body;
  const tokenUserID = req.userID;

  try {
    const newPost = await Post.create({
      ...body.postData,
      user: tokenUserID,
      postDetails: {
        createdBy: body.postDetails,
      },
    });

    res.status(201).json({
      message: "Real estate post added successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Error adding real estate post:", error);

    res.status(500).json({
      message: "Error adding real estate post",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updateData = req.body;

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({
        message: "Real estate post not found",
      });
    }

    res.status(200).json({
      message: "Real estate post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error updating real estate post:", error);
    res.status(500).json({
      message: "Error updating real estate post",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({
        message: "Real estate post not found",
      });
    }

    res.status(200).json({
      message: "Real estate post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    console.error("Error deleting real estate post:", error);
    res.status(500).json({
      message: "Error deleting real estate post",
      error: error.message,
    });
  }
};

export { getPosts, getPost, addPost, updatePost, deletePost };
