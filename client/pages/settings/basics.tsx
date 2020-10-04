import React, { Component, useContext, useState } from "react";
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
import { UserContext } from "../../contexts/userContext";
import { connect } from "react-redux";

interface Props {
  user: User | null;
}
interface State {
  loading: boolean;
  error: string | null;
}

let fetchedUser = {};
const basics = (
  props: InjectedFormProps<BasicProfileFormValues, Props> & Props
) => {
  const { user } = useContext(UserContext);
  const [loading, SetLoading] = useState<State["loading"]>(false);
  const [error, SetError] = useState<State["error"]>(null);
  const basicProfile = async (formValues: BasicProfileFormValues) => {
    try {
      console.log(formValues);
      SetLoading(true);
      await Axios.post("/api/user/profile/edit", formValues);
      Router.push(`/profile/${user?._id}`);
      SetLoading(false);
    } catch (error) {
      console.log(error);
      SetLoading(false);
      SetError("Error updating profile");
    }
  };
  fetchedUser = user!;
  return (
    <Layout title="Basics" user={props.user}>
      <div className="profile">
        <Grid stackable>
          <Grid.Column width={12}>
            <Segment>
              <Header dividing size="large" content="Basics" />
              <Form
                onSubmit={props.handleSubmit(
                  (formValues: BasicProfileFormValues) =>
                    basicProfile(formValues)
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
                  disabled={props.pristine || loading}
                  size="large"
                  positive
                  content="Update Profile"
                  loading={loading}
                />
                <h5 style={{ color: "red" }}>{error}</h5>
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
};
const mapStateToProps = () => {
  return {
    initialValues: fetchedUser
  };
};
export default withAuth(
  connect(mapStateToProps)(
    reduxForm<BasicProfileFormValues, Props>({
      form: "basics",
      enableReinitialize: true,
      destroyOnUnmount: false
    })(basics)
  )
);
