import React, { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error(`Search term must be at least 3 characters long`);
    }

    // console.log(conversations);
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="search-user d-flex align-items-center justify-content-between"
    >
      <input
        type="text"
        placeholder="Search User"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />{" "}
      <i className="fa-solid fa-magnifying-glass"></i>
    </form>
  );
};

export default SearchInput;
