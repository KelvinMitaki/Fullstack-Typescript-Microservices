import React from "react";
import ReactDatePicker from "react-datepicker";
import { Form } from "semantic-ui-react";
import { WrappedFieldProps } from "redux-form";

interface Props extends WrappedFieldProps {
  dateFormat: string;
  showTimeSelect: boolean;
  timeFormat: string;
  placeholder: string;
}

const DateInput = ({
  input: { value, onChange, onBlur },
  meta: { touched, error },
  ...props
}: Props) => {
  console.log(value);
  console.log(Object.prototype.toString.call(value));
  // FIX DATE WHEN FETCHING FROM THE DB WHICH COMES AS A STRING
  if (
    Object.prototype.toString.call(value) === "[object String]" &&
    value.trim() !== ""
  ) {
    value = new Date(value);
  }
  return (
    <Form.Field error={error && touched}>
      <ReactDatePicker
        {...props}
        selected={value}
        onChange={onChange}
        onBlur={onBlur}
        onChangeRaw={e => e.preventDefault()}
      />
    </Form.Field>
  );
};

export default DateInput;
