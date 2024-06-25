import React, { useState } from "react";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    gender: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("User logged in", formData);
  };

  const signup = async () => {
    console.log("User Signed up", formData);
  };

  return (
    <div className="loginSignup d-flex">
      <div className="loginSignup-container">
        <h2>{state}</h2>

        <div className="loginSignup-fields">
          {state === "Sign Up" ? (
            <input
              value={formData.fullName}
              onChange={changeHandler}
              type="text"
              name="fullName"
              id="name"
              placeholder="Enter Your Name"
            />
          ) : (
            <></>
          )}
          <input
            value={formData.username}
            onChange={changeHandler}
            type="username"
            name="username"
            id="username"
            placeholder="Enter Your Username"
          />
          <input
            value={formData.password}
            onChange={changeHandler}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          {state === "Sign Up" ? (
            <input
              value={formData.confirmPassword}
              onChange={changeHandler}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
          ) : (
            <></>
          )}
          {state === "Sign Up" ? (
            <label for="gender">
              <select
                value={formData.gender}
                onChange={changeHandler}
                name="gender"
                id=""
                className="add-product-selector"
              >
                <option value="Select">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          ) : (
            <></>
          )}
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          type="submit"
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginSignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here.
            </span>
          </p>
        ) : (
          <p className="loginSignup-login">
            Crate an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here.
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
