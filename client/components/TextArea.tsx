import React from "react";
import { Form } from "semantic-ui-react";

interface TextAreaInterface {
  rows?: number;
  placeholder: string;
  meta: { [key: string]: string };
  input: { [key: string]: string };
}

const TextArea = ({ rows, placeholder, input }: TextAreaInterface) => {
  return (
    <Form.Field>
      <textarea placeholder={placeholder} rows={rows} {...input} />
    </Form.Field>
  );
};

export default TextArea;
