import React from "react";
import { Form, Select } from "semantic-ui-react";

interface SelectInputInterface {
  multiple: boolean;
  options: {
    key: string;
    text: string;
    value: string;
  }[];
  type?: string;
}

const SelectInput = ({ multiple, options, type }: SelectInputInterface) => {
  return (
    <Form.Field>
      <Select
        // value={input.value || null}
        // onChange={(e, data) => input.onChange(data.value)}
        options={options}
        multiple={multiple}
        type={type}
      />
    </Form.Field>
  );
};

export default SelectInput;
