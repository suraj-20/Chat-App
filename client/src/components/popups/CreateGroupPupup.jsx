import React, { useState } from "react";
import useCreate from "../../hooks/useCreateGroup";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const CreateGroupPupup = ({ popup, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    members: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { authUser } = useAuthContext();
  const { loading, create, createGroup } = useCreate();

  const searchUsers = async (inputValue) => {
    if (!inputValue) {
      setSearchResults([]);
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/search?query=${inputValue}`,
      {
        headers: {
          Authorization: `${authUser.token}`,
        },
      }
    );

    const data = await response.json();
    setSearchResults(data.users);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    searchUsers(e.target.value);
  };

  const addMember = (user) => {
    // if (!formData.members) {
    //   formData.members = [];
    // }
    if (!formData.members.some((member) => member._id === user._id)) {
      setFormData({
        ...formData,
        members: [...formData.members, user],
      });
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const removeMember = (userId) => {
    setFormData({
      ...formData,
      members: formData.members.filter((member) => member._id !== userId),
    });
  };

  // const changeHandler = (selectedOptions) => {
  //   setFormData({
  //     ...formData,
  //     members: selectedOptions.map((option) => option.value),
  //   });
  //   // console.log(formData);
  // };

  const handleSubmit = async () => {
    try {
      await create(formData);
      window.location.replace("/");
    } catch (error) {
      toast.error("Error in creating group");
    }
  };

  if (!popup) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-container creategroup-popup-container">
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="popup-content creategroup-popup-content d-flex flex-column justify-content-between gap-4">
          <div className="popup-heading">
            <h2>Create Group Chat</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            action=""
            className="d-flex flex-column align-items-center justify-content-between gap-3"
          >
            <div className="search-user">
              <input
                type="text"
                placeholder="Group Name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="search-user">
              {/* <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                isMulti
                onChange={changeHandler}
                placeholder="Add Users"
              /> */}
              <input
                type="text"
                name="members"
                id=""
                placeholder="Add Users"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((user) => (
                    <div
                      style={{ cursor: "pointer" }}
                      key={user._id}
                      className="search-result-item"
                      onClick={() => addMember(user)}
                    >
                      {user.username}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="selected-members">
              {formData.members.map((user) => (
                // console.log(user),
                <div key={user._id} className="selected-member">
                  {user.username}
                  <button
                    type="button"
                    className="btn remove-btn"
                    style={{ color: "red" }}
                    onClick={() => removeMember(user._id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button
                className="create-btn btn primary-btn"
                style={{ background: "#ff4141", color: "white" }}
              >
                Create
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPupup;
