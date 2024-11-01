import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ShowPassword = ({ visible, onClick }) => {
  return (
    <span
      onClick={onClick}
      className="password-toggle-icon"
      style={{ cursor: "pointer", color: "black" }}
    >
      {visible ? <VisibilityOff /> : <Visibility />}
    </span>
  );
};

export default ShowPassword;
