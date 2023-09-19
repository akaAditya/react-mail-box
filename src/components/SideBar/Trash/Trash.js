import React from "react";

const Trash = (props) => {
  return (
    <div>
      <div
        style={{
          fontFamily: "arial",
          padding: "20px",
          fontSize: "25px",
          color: "#198a26",
        }}
      >
        Trash
      </div>
      <button className="button-45" onClick={props.onClose}>
        Close
      </button>
    </div>
  );
};

export default Trash;
