import React from "react";

const Input = ({ name, label, error, type, ...rest }) => {
  return (
    <div className="form-group">
      {type === "textarea" && (
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <textarea
            {...rest}
            name={name}
            id={name}
            className="form-control"
            style={{ rows: "3", resize: "none" }}
          />
        </div>
      )}

      {type !== "textarea" && (
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input {...rest} type={type} name={name} id={name} className="form-control" />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default Input;
