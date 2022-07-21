import React from "react";

const Comment = (props) => {
  return (
    <i
      onClick={props.onClick}
      className="fa fa-comment"
      style={{ cursor: "pointer", "margin-left": "10px" }}
      aria-hidden="true"
    ></i>
  );
};

export default Comment;
