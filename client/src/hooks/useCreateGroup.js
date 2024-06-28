import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useCreate = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const [createGroup, setCreateGroup] = useState();

  const create = async ({ name, members }) => {
    const success = handleInputErrors({
      name,
      members,
    });

    if (!success) return;

    setLoading(true);

    try {
      console.log(process.env.REACT_APP_BASE_URL);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/messages/createGroup`,
        {
          name,
          members,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${authUser.token}`,
          },
        }
      );

      const responseData = response.data;
      console.log(responseData);

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      // localStorage.setItem("user-auth", JSON.stringify(responseData));
      setCreateGroup(responseData);
    } catch (error) {
      console.error("Error in user create: ", error.message);
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred during create.");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, create, createGroup };
};

export default useCreate;

function handleInputErrors({ name, members }) {
  if (!name || !members) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (members < 2) {
    toast.error("Please add member more then 2");
    return false;
  }

  return true;
}
