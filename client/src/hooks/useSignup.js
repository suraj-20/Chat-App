import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

const useSignup = () => {
  //   const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setauthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/signup`,
        {
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;
      console.log(responseData);

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      localStorage.setItem("user-auth", JSON.stringify(responseData));
      setauthUser(responseData);

      //   if (responseData.success) {
      //     localStorage.setItem("jwt", responseData.token);
      //     navigate("/login");
      //     toast.success("User signed up successfully!");
      //   } else {
      //     toast.error("Error in user signup");
      //   }
    } catch (error) {
      console.error("Error in user signup: ", error.message);
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred during signup.");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username | !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
