import React, { Component } from "react";
import Layout from "../components/Layout";
import { Segment, Grid, Form, Button, Divider } from "semantic-ui-react";
import Router from "next/router";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import validator from "validator";
import TextInput from "../components/reduxForm/TextInput";
import { LoginFormValues } from "../interfaces/Login";
import { User } from "../interfaces/User";
import Axios from "axios";
import withoutAuth from "../hocs/withoutAuth";

interface Props {
  user: User | null;
  invalid: boolean;
}

interface State {
  loading: boolean;
  errors: { message: string; field?: string }[] | null;
}

export class Login extends Component<
  InjectedFormProps<LoginFormValues, Props> & Props,
  State
> {
  constructor(props: InjectedFormProps<LoginFormValues, Props> & Props) {
    super(props);
    this.state = {
      loading: false,
      errors: null
    };
  }
  async loginUser(formValues: LoginFormValues) {
    try {
      this.setState({ loading: true });
      await Axios.post("/api/user/login", formValues);
      Router.push("/");
      this.setState({ loading: false });
    } catch (error) {
      const errors = error.response.data.errors;
      this.setState({ loading: false, errors: errors });
    }
  }
  render() {
    return (
      <Layout title="Login" user={this.props.user}>
        <div className="segment profile">
          <Segment placeholder>
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
                <Form
                  onSubmit={this.props.handleSubmit(
                    (formValues: LoginFormValues) => this.loginUser(formValues)
                  )}
                >
                  <Field
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="Your Email"
                    component={TextInput}
                  />
                  <Field
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Your Password"
                    component={TextInput}
                  />

                  <Button
                    content="Login"
                    primary
                    fluid
                    disabled={this.props.invalid || this.state.loading}
                    loading={this.state.loading}
                  />
                </Form>

                <h5 style={{ color: "red", textAlign: "center" }}>
                  {this.state.errors &&
                    this.state.errors.map(err => (
                      <p key={err.message}>{err.message}</p>
                    ))}
                </h5>
              </Grid.Column>

              <Grid.Column verticalAlign="middle">
                <Button
                  content="Sign up"
                  icon="signup"
                  onClick={() => Router.push("/register")}
                  size="big"
                />
              </Grid.Column>
            </Grid>
            <div className="vertical">
              <Divider vertical>Or</Divider>
            </div>
          </Segment>
        </div>

        <style jsx>{`
          @media screen and (max-width: 768px) {
            .vertical {
              display: none;
            }
          }
          .segment {
            margin-top: 30vh;
          }
          .profile {
            margin-top: 35vh;
          }
          @media screen and (min-width: 768px) {
            .profile {
              margin-top: 25vh;
            }
          }
        `}</style>
      </Layout>
    );
  }
}

const validate = (formValues: LoginFormValues) => {
  const errors: { [key: string]: string } = {};
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
    errors.password = "Password must be six characters minimum";
  }
  return errors;
};
export default withoutAuth(
  reduxForm<LoginFormValues, Props>({
    form: "login",
    validate
  })(Login)
);
