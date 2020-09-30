import React from "react";
import { Form } from "semantic-ui-react";

interface TextAreaInterface {
  rows?: number;
  placeholder: string;
}

const TextArea = ({ rows, placeholder }: TextAreaInterface) => {
  return (
    <Form.Field>
      <textarea placeholder={placeholder} rows={rows} />
    </Form.Field>
  );
};

export default TextArea;
