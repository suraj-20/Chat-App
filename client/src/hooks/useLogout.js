import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setauthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: {
          "Contect-Type": "application/json",
        },
      });

      const responseData = await res.json();

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      localStorage.removeItem("user-auth");
      setauthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
