import React from "react";

const AddCategory = ({ title, onChange }) => {
  return (
    <div>
      <h1>{title} </h1>
      <input type="text" onChange={onChange} />
    </div>
  );
};

export default AddCategory;
