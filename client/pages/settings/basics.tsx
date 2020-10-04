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
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import RadioButton from "../../components/reduxForm/RadioButton";
import Router from "next/router";
import { User } from "../../interfaces/User";
import { BasicProfileFormValues } from "../../interfaces/Basics";
import Axios from "axios";
import withAuth from "../../hocs/withAuth";

interface Props {
  user: User | null;
}

export class basics extends Component<
  InjectedFormProps<BasicProfileFormValues, Props> & Props
> {
  state = {
    loading: false,
    error: null
  };
  basicProfile = async (formValues: BasicProfileFormValues) => {
    try {
      console.log(formValues);
      this.setState({ loading: true });
      await Axios.post("/api/user/profile/edit", formValues);
      Router.push("/profile");
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      this.setState({ error: "Error updating profile", loading: false });
    }
  };
  render() {
    return (
      <Layout title="Basics" user={this.props.user}>
        <div className="profile">
          <Grid stackable>
            <Grid.Column width={12}>
              <Segment>
                <Header dividing size="large" content="Basics" />
                <Form
                  onSubmit={this.props.handleSubmit(
                    (formValues: BasicProfileFormValues) =>
                      this.basicProfile(formValues)
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
                    disabled={this.props.pristine || this.state.loading}
                    size="large"
                    positive
                    content="Update Profile"
                    loading={this.state.loading}
                  />
                  <h5 style={{ color: "red" }}>{this.state.error}</h5>
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

export default withAuth(
  reduxForm<BasicProfileFormValues, Props>({
    form: "basics",
    enableReinitialize: true,
    destroyOnUnmount: false
  })(basics)
);
