import User from "../models/user.model.js";

const getUsers = async (req, res) => {
  console.log("its working");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const tokenUserId = req.userID;

  if (tokenUserId !== userId) {
    return res.status(403).json({ message: "You are not authorized to perform this action." });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Failed to update user." });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export { getUsers, getUser, updateUser, deleteUser };
