import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  console.log("its working");
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched successfully",
      users: users,
    });
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
    res.status(200).json({
      message: "User fetched successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;

  const tokenUserId = req.userID;

  const { password, avatar, ...inputs } = req.body;

  if (tokenUserId !== userId) {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action." });
  }

  let updatePassword = null;

  try {
    if (password) {
      updatePassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...inputs,
        ...(updatePassword && { password: updatePassword }),
        ...(avatar && { avatar }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Failed to update user." });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params.id;
  const tokenUserId = req.userId;
  if (tokenUserId !== id) {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action." });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export { getUsers, getUser, updateUser, deleteUser };
