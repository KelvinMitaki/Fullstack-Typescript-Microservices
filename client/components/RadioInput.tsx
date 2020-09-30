import React from "react";
import { Form } from "semantic-ui-react";

interface RadioInputInterface {
  label: string;
  type: string;
  width?: number;
  input: { [key: string]: string };
}

const RadioInput = ({ input, type, label }: RadioInputInterface) => {
  return (
    <Form.Field>
      <div className="ui radio">
        <input type={type} {...input} /> <label>{label} </label>
      </div>
    </Form.Field>
  );
};

export default RadioInput;
