import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const { authUser } = useAuthContext();
  //   console.log(authUser.token);
  const [loading, setLoading] = useState();
  const { message, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/messages/${selectedConversation._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${authUser.token}`,
            },
          }
        );

        const data = await res.json();
        console.log(data);

        if (data.error) throw new Error(data.error);

        setMessage(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessage]);
  return { loading, message };
};

export default useGetMessages;
