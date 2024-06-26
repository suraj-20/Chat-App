// import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const { setauthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = handleInputErrors({
      username,
      password,
    });

    if (!success) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      localStorage.setItem("user-auth", JSON.stringify(responseData));
      setauthUser(responseData);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
