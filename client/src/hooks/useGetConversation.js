import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversation = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [groupConversations, setGroupConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/auth/user`,
          {
            headers: {
              Authorization: `${authUser.token}`,
            },
          }
        );
        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.error) {
          throw new Error(responseData.error);
        }
        setConversations(responseData.filteredUsers);
        setGroupConversations(responseData.groupConversations);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  return { loading, conversations, groupConversations };
};

export default useGetConversation;
