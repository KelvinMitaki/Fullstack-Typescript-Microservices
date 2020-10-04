import React from "react";

interface RadioButtonInterface {
  input: { [key: string]: string };
  label: string;
  type: string;
  value: string;
  name: string;
}

const RadioButton = ({ input, label }: RadioButtonInterface) => {
  return (
    <div>
      <input type="radio" {...input} style={{ marginLeft: "5px" }} />
      <label> {label} </label>
    </div>
  );
};

export default RadioButton;
