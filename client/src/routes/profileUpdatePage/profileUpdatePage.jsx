import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./profileUpdatePage.scss";
import apiRequest from "../../lib/apiRequest.js";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget.jsx";

function ProfileUpdatePage() {
  const [error, setError] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await apiRequest.put(`/users/${currentUser.user._id}`, {
        username,
        email,
        password,
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const avatarSrc = currentUser?.avatar || "/noavatar.png";

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser?.user.username || ""}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser?.user.email || ""}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatarSrc} alt="User Avatar" className="avatar" />
      <UploadWidget uwConfig={{
        cloudName: "itskode",
        uploadPreset: "real-estate",
        sources: ["local", "camera", "url"],
        showAdvancedOptions: false,
        cropping: false,
        multiple: false,
        defaultSource: "local",
        maxFileSize: 10000000,
        folder: "avatars",
        tags: ["avatar"],
        resourceType: "image",
        clientAllowedFormats: ["png", "jpg", "jpeg"],
        maxImageFileSize: 10000000,
        maxVideoFileSize: 10000000,
        maxImageWidth: 1000,
        maxImageHeight: 1000,
        croppingAspectRatio: 1,
        croppingShape: "square",
        croppingGravity: "faces",
        croppingDefaultZoom: 1,
        croppingMinZoom: 0.5,
        croppingMaxZoom: 2,
      }} />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
