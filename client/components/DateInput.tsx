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
  return (
    <Form.Field error={error && touched}>
      <ReactDatePicker
        {...props}
        onChange={onChange}
        onBlur={onBlur}
        onChangeRaw={e => e.preventDefault()}
      />
    </Form.Field>
  );
};

export default DateInput;
