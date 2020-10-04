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
  input: { onChange(data: any): void };
}

const SelectInput = ({
  multiple,
  options,
  type,
  input
}: SelectInputInterface) => {
  return (
    <Form.Field>
      <Select
        onChange={(e, data) => input.onChange(data.value)}
        options={options}
        multiple={multiple}
        type={type}
      />
    </Form.Field>
  );
};

export default SelectInput;
