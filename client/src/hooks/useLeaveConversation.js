// hooks/useLeaveGroupConversation.js
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLeaveGroupConversation = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const leaveGroupConversation = async (conversationId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/messages/leave-group/${conversationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authUser.token}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Could not leave the group conversation."
        );
      }

      toast.success("You have left the group conversation");
      return responseData;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, leaveGroupConversation };
};

export default useLeaveGroupConversation;
