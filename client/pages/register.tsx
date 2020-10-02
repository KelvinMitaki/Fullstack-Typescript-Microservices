import React, { Component } from "react";
import Layout from "../components/Layout";
import { Form, Button, Segment, Message, Icon } from "semantic-ui-react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import TextInput from "../components/reduxForm/TextInput";
import validator from "validator";
import { connect } from "react-redux";
import { RegisterUser, registerUser } from "../redux/actions";
import Link from "next/link";
import router from "next/router";
import { RegisterFormValues } from "../interfaces/Register";
import { GetInitialProps } from "../interfaces/GetInitialProps";
import { User } from "../interfaces/User";
import { StoreState } from "../interfaces/StoreState";

interface Props {
  user: User | null;
  registerUser: Function;
  registerError: string | null;
  registerLoading: boolean;
}

export class register extends Component<
  InjectedFormProps<RegisterFormValues, Props> & Props
> {
  componentDidMount() {
    if (this.props.user && this.props.user.isLoggedIn) {
      router.replace("/");
    }
  }

  static async getInitialProps({ res, store }: GetInitialProps) {
    if (
      store &&
      res &&
      store.getState().auth.user &&
      store.getState().auth.user?.isLoggedIn
    ) {
      res.writeHead(301, { location: "/" });
      res.end();
    }
    return { store };
  }
  render() {
    return (
      <Layout title="register">
        <div className="segment profile">
          <Segment>
            <Form
              onSubmit={this.props.handleSubmit(formValues =>
                this.props.registerUser(formValues)
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
                disabled={this.props.invalid || this.props.registerLoading}
                loading={this.props.registerLoading}
              />
              <h5 style={{ color: "red" }}>{this.props.registerError}</h5>
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

const mapStateToProps = (state: StoreState) => {
  return {
    registerLoading: state.auth.registerLoading,
    user: state.auth.user,
    registerError: state.auth.registerError
  };
};
export default reduxForm<RegisterFormValues, Props>({
  form: "register",
  validate
})(connect(mapStateToProps, { registerUser })(register));
