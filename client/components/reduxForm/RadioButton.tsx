import React from "react";

interface RadioButtonInterface {
  input: { [key: string]: string };
  label: string;
}

const RadioButton = ({ input, label }: RadioButtonInterface) => {
  return (
    <div>
      <input
        type="radio"
        // name={radioName}
        {...input}
        style={{ marginLeft: "5px" }}
        // onChange={input.onChange}
        // value={radioValue}
      />
      <label> {label} </label>
    </div>
  );
};

export default RadioButton;
