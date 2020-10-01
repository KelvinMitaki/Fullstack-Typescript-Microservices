import React, { Component } from "react";
import Layout from "../components/Layout";
import { Segment, Grid, Form, Button, Divider } from "semantic-ui-react";
import router from "next/router";
import { reduxForm, Field } from "redux-form";
import validator from "validator";
import TextInput from "../components/reduxForm/TextInput";
import { connect } from "react-redux";
import { LoginUser, loginUser } from "../redux/actions";
import { StoreState } from "../interfaces/StoreState";
import { LoginFormValues } from "../interfaces/Login";
import { GetInitialProps } from "../interfaces/GetInitialProps";
import { User } from "../interfaces/User";

interface Props {
  user: User | null;
  loginUser: Function;
  handleSubmit(callback: Function): any;
  loading: boolean;
  loginError: string | null;
  invalid: boolean;
}

export class Login extends Component<Props> {
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
      <Layout title="Login">
        <div className="segment profile">
          <Segment placeholder>
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
                <Form
                  onSubmit={this.props.handleSubmit(
                    (formValues: LoginFormValues): LoginUser =>
                      this.props.loginUser(formValues)
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
                    disabled={this.props.invalid || this.props.loading}
                    loading={this.props.loading}
                  />
                </Form>

                <h5 style={{ color: "red", textAlign: "center" }}>
                  {this.props.loginError}
                </h5>
              </Grid.Column>

              <Grid.Column verticalAlign="middle">
                <Button
                  content="Sign up"
                  icon="signup"
                  onClick={() => router.push("/register")}
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
const mapStateToProps = (state: StoreState) => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    loginError: state.auth.loginError
  };
};
export default reduxForm({ form: "login", validate })(
  connect(mapStateToProps, { loginUser })(Login)
);
