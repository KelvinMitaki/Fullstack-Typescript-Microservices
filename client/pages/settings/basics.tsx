import React, { Component } from "react";
import {
  Button,
  Segment,
  Header,
  Form,
  Divider,
  Grid
} from "semantic-ui-react";
import Layout from "../../components/Layout";
import SettingsNav from "../../components/SettingsNav";
import TextInput from "../../components/reduxForm/TextInput";
import { reduxForm, Field } from "redux-form";
import RadioButton from "../../components/reduxForm/RadioButton";
import { connect } from "react-redux";
import { basicProfile } from "../../redux/actions";
import router from "next/router";
import { StoreState } from "../../interfaces/StoreState";
import { User } from "../../interfaces/User";
import { GetInitialProps } from "../../interfaces/GetInitialProps";
import { BasicProfileFormValues } from "../../interfaces/Basics";

interface Basics {
  user: User | null;
  handleSubmit: Function;
  basicProfile: Function;
  loading: boolean;
  pristine: boolean;
}

export class basics extends Component<Basics> {
  componentDidMount() {
    if (this.props.user && !this.props.user.isLoggedIn) {
      router.replace("/login");
    }
  }
  static async getInitialProps({ res, store }: GetInitialProps) {
    if (
      store &&
      res &&
      store.getState().auth.user &&
      !store.getState().auth.user?.isLoggedIn
    ) {
      res.writeHead(301, { location: "/login" });
      res.end();
      return { store };
    }
    return {
      initialValues: store.getState().auth.user && store.getState().auth.user
    };
  }
  render() {
    return (
      <Layout title="Basics">
        <div className="profile">
          <Grid stackable>
            <Grid.Column width={12}>
              <Segment>
                <Header dividing size="large" content="Basics" />
                <Form
                  onSubmit={this.props.handleSubmit(
                    (formValues: BasicProfileFormValues) =>
                      this.props.basicProfile(formValues)
                  )}
                >
                  <Field
                    component={TextInput}
                    type="text"
                    name="knownAs"
                    placeholder="Known As"
                  />
                  <Form.Group inline>
                    <label>Gender: </label>
                    <Field
                      component={RadioButton}
                      label="Male"
                      value="male"
                      name="gender"
                      type="radio"
                    />
                    <Field
                      component={RadioButton}
                      label="Female"
                      value="female"
                      name="gender"
                      type="radio"
                    />
                  </Form.Group>
                  {/* <Field
            width={8}
            name="dateOfBirth"
            component={DateInput}
            placeholder="Date of Birth"
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode="select"
            maxDate={addYears(new Date(), -18)}
          /> */}
                  <Field
                    component={TextInput}
                    name="homeTown"
                    placeholder="Home Town"
                    type="text"
                  />
                  <Divider />
                  <Button
                    disabled={this.props.pristine || this.props.loading}
                    size="large"
                    positive
                    content="Update Profile"
                    loading={this.props.loading}
                  />
                  {/* {console.log(this.props)} */}
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <SettingsNav />
            </Grid.Column>
          </Grid>
        </div>
        <style jsx>{`
          .profile {
            margin-top: 35vh;
          }
          @media screen and (min-width: 760px) {
            .profile {
              margin-top: 25vh;
            }
          }
        `}</style>
      </Layout>
    );
  }
}
const mapStateToProps = (state: StoreState) => {
  return {
    loading: state.auth.loading,
    user: state.auth.user
  };
};
export default reduxForm({
  form: "basics",
  enableReinitialize: true,
  destroyOnUnmount: false
})(connect(mapStateToProps, { basicProfile })(basics));
