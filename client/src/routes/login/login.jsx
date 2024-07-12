import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js";

function Login() {
  const [loginError, setloginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");
    setIsLoading(true);
    setloginError("");
    try {
      // const response = await axios.post(
      //   "http://localhost:3000/api/auth/register",
      //   {
      //     username,
      //     email,
      //     password,
      //   }
      // );
      const response = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      setIsLoading(false);
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setloginError(error.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {loginError && <p>{loginError}</p>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
