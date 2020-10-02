import React from "react";
import { Form } from "semantic-ui-react";

interface TextInputInterface {
  label?: string;
  id?: string;
  placeholder: string;
  input?: { [key: string]: string };
  meta?: { [key: string]: string };
  type?: string;
}

const TextInput = ({
  label,
  id,
  placeholder,
  input,
  meta,
  type
}: TextInputInterface) => {
  return (
    <React.Fragment>
      <Form.Field>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} placeholder={placeholder} {...input} />
        {meta && meta.touched && meta.error && (
          <div style={{ color: "red" }}>{meta.error}</div>
        )}
      </Form.Field>
    </React.Fragment>
  );
};

export default TextInput;
