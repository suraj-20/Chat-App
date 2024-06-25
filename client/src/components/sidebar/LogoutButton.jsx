import React from "react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto">
      {!loading ? (
        <i
          onClick={logout}
          className="fa-solid fa-right-from-bracket"
          style={{
            fontSize: "2rem",
            transform: "rotate(180deg)",
            cursor: "pointer",
          }}
        ></i>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
