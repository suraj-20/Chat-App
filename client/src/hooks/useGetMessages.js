import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const { authUser } = useAuthContext();
  //   console.log(authUser.token);
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        console.log(process.env.REACT_APP_BASE_URL);
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/messages/${selectedConversation._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${authUser.token}`,
            },
          }
        );

        const data = await res.json();
        // console.log(data);

        if (data.error) throw new Error(data.error);

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading };
};

export default useGetMessages;
