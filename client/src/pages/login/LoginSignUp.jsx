import React, { useState } from "react";
import "./LoginSignUp.css";
import useSignup from "../../hooks/useSignup";
import useLogin from "../../hooks/useLogin";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();
  const { login } = useLogin();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleSignup = async () => {
    await signup(formData);
  };

  const handleLogin = async () => {
    await login(formData);
  };

  // const login = async () => {
  //   console.log("User logged in", formData);
  //   try {
  //     const response = await axios.post(
  //       "${process.env.REACT_APP_BASE_URL}/api/auth/login",
  //       formData,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const responseData = response.data;
  //     console.log(responseData.token);

  //     if (responseData) {
  //       localStorage.setItem("jwt", responseData.token);
  //       alert("User logged in successfully");
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Error in user login: ", error.message);
  //     if (error.response && error.response.data) {
  //       alert(error.response.data.message);
  //     } else {
  //       alert("An error occurred during login.");
  //     }
  //   }
  // };

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
            <label htmlFor="gender">
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
          onClick={(e) => {
            e.preventDefault();
            state === "Login" ? handleLogin() : handleSignup();
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            `${state === "Login" ? "Login" : "Sign Up"}`
          )}
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
