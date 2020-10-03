import React, { Component } from "react";
import Layout from "../components/Layout";
import { Form, Button, Segment, Message, Icon } from "semantic-ui-react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import TextInput from "../components/reduxForm/TextInput";
import validator from "validator";
import Link from "next/link";
import Router from "next/router";
import { RegisterFormValues } from "../interfaces/Register";
import { User } from "../interfaces/User";
import Axios from "axios";

interface Props {
  user: User | null;
}

interface State {
  errors: { message: string; field?: string }[] | null;
  loading: boolean;
}

export class register extends Component<
  InjectedFormProps<RegisterFormValues, Props> & Props,
  State
> {
  constructor(props: InjectedFormProps<RegisterFormValues, Props> & Props) {
    super(props);
    this.state = {
      errors: null,
      loading: false
    };
  }
  async registerUser(formValues: RegisterFormValues) {
    try {
      this.setState({ loading: true });
      await Axios.post("/api/user/register", formValues);
      this.setState({ loading: false });
      Router.push("/");
    } catch (error) {
      this.setState({ loading: false, errors: error.response.data.errors });
    }
  }
  render() {
    return (
      <Layout title="register" user={this.props.user}>
        <div className="segment profile">
          <Segment>
            <Form
              onSubmit={this.props.handleSubmit(formValues =>
                this.registerUser(formValues)
              )}
            >
              <Form.Group widths="equal">
                <Field
                  name="firstName"
                  component={TextInput}
                  label="First Name"
                  id="firstName"
                  type="text"
                />
                <Field
                  name="lastName"
                  component={TextInput}
                  label="Last Name"
                  id="lastName"
                  type="text"
                />
              </Form.Group>
              <Field
                name="email"
                component={TextInput}
                label="Email"
                id="email"
                type="text"
              />
              <Field
                name="password"
                component={TextInput}
                label="Password"
                id="password"
                type="password"
              />
              <Field
                name="confirmPassword"
                component={TextInput}
                label="Confirm Password"
                id="confirmPassword"
                type="password"
              />
              <Button
                fluid
                content="Register"
                primary
                disabled={this.props.invalid || this.state.loading}
                loading={this.state.loading}
              />
              <h5 style={{ color: "red" }}>
                {this.state.errors &&
                  this.state.errors.map(err => (
                    <p key={err.message}>{err.message}</p>
                  ))}
              </h5>
            </Form>
            <Message attached="bottom" warning>
              <Icon name="help" />
              Already signed up?&nbsp;
              <Link href="/login">
                <a>Login here</a>
              </Link>
              &nbsp;instead.
            </Message>
          </Segment>
        </div>
        <style jsx>{`
          .segment {
            margin-top: 25vh;
          }
          .profile {
            margin-top: 35vh;
          }
          @media screen and (min-width: 760px) {
            .profile {
              margin-top: 20vh;
            }
          }
        `}</style>
      </Layout>
    );
  }
}
const validate = (formValues: RegisterFormValues) => {
  const errors: { [key: string]: string } = {};
  if (
    !formValues.firstName ||
    (formValues.firstName && formValues.firstName.trim() === "")
  ) {
    errors.firstName = "Please enter your first name";
  }
  if (
    !formValues.lastName ||
    (formValues.lastName && formValues.lastName.trim() === "")
  ) {
    errors.lastName = "Please enter your last name";
  }
  if (
    !formValues.email ||
    (formValues.email && !validator.isEmail(formValues.email))
  ) {
    errors.email = "Please enter a valid email";
  }
  if (
    !formValues.password ||
    (formValues.password && formValues.password.trim().length < 6)
  ) {
    errors.password = "Password must be at least six characters";
  }
  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default reduxForm<RegisterFormValues, Props>({
  form: "register",
  validate
})(register);
