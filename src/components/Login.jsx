import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log(email, password);
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      setEmailId("");
      setPassword("");
      return res;
    } catch (err) {
      if (err.response) {
        console.log("Response error:", err.response.status, err.response.data);
      } else if (err.request) {
        console.log(
          "No response from server. Check if backend is running on port 7777",
        );
      } else {
        console.log("Error:", err.message);
      }
    }
  };
  return (
    <div className="flex justify-center mt-20">
      <div className="card card-border bg-base-300 w-96 my-10">
        <div className="card-body ">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">EmailID</legend>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmailId(e.target.value)}
              className="input"
              placeholder="Enter your email id"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your Password"
            />
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
