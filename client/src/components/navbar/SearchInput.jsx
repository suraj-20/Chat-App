import React from "react";

const SearchInput = () => {
  return (
    <div className="search-user d-lg-flex d-none align-items-center justify-content-between">
      <input type="text" placeholder="Search User" />{" "}
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  );
};

export default SearchInput;
