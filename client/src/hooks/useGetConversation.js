import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversation = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/user`, {
          headers: {
            Authorization: `${authUser.token}`,
          },
        });
        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.error) {
          throw new Error(responseData.error);
        }
        setConversations(responseData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  return { loading, conversations };
};

export default useGetConversation;
