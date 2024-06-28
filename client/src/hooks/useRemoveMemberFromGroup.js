import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useRemoveMemberFromGroup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const removeMemberFromGroup = async (conversationId, memberId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/messages/${conversationId}/remove/${memberId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authUser.token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to remove member from conversation"
        );
      }

      const responseData = await response.json();
      toast.success(responseData.message);
      return responseData; // Optional: You can return data if needed
    } catch (error) {
      toast.error("Error removing member from conversation:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, removeMemberFromGroup };
};

export default useRemoveMemberFromGroup;
