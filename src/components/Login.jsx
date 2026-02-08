import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data));
      setEmailId("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data)
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
  const handleSignup = async () =>{
    try{
      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, email, password}, {withCredentials: true});
      dispatch(addUser(res.data));
      navigate("/profile")
    }catch(err){
      setError(err.message)
    }
  }
  return (
    <div className="flex justify-center mt-20">
      <div className="card card-border bg-base-300 w-96 my-10">
        <div className="card-body ">
          <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  placeholder="Enter your First Name"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  placeholder="Enter your Password"
                />
              </fieldset>
            </>
          )}

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
          <div className="text-red-500">
            <span>{error}</span>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="card-actions justify-center items-center gap-2">
            <span className="text-sm opacity-80">
              {isLoginForm ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              className="btn btn-outline btn-primary btn-sm"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
