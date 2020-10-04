import React, { Component, useContext, useState } from "react";
import Layout from "../../components/Layout";
import TextArea from "../../components/TextArea";
import SelectInput from "../../components/SelectInput";
import {
  Segment,
  Header,
  Form,
  Divider,
  Button,
  Grid
} from "semantic-ui-react";
import Router from "next/router";
import SettingsNav from "../../components/SettingsNav";
import TextInput from "../../components/reduxForm/TextInput";
import { User } from "../../interfaces/User";
import withAuth from "../../hocs/withAuth";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import RadioButton from "../../components/reduxForm/RadioButton";
import { UserContext } from "../../contexts/userContext";
import Axios from "axios";
import { connect } from "react-redux";

const interests = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];
interface Props {
  user: User | null;
}
interface FormValues {
  status: string;
  aboutMe: string;
  interests: string[];
  occupation: string;
  originCountry: string;
}
interface State {
  loading: boolean;
  error: string | null;
}
let fetchedUser = {};
const about = (props: InjectedFormProps<FormValues, Props> & Props) => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState<State["error"]>(null);
  const [loading, setLoading] = useState<State["loading"]>(false);

  const updateProfile = async (formValues: FormValues): Promise<void> => {
    try {
      setLoading(true);
      await Axios.post("/api/user/profile/edit", formValues);
      Router.push(`/profile/${user?._id}`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error updating profile");
    }
  };
  fetchedUser = user!;
  return (
    <Layout title="About">
      <div className="profile">
        <Grid stackable>
          <Grid.Column width={12}>
            <Segment>
              <Header dividing size="large" content="About Me" />
              <p>Complete your profile to get the most out of this site</p>
              <Form
                onSubmit={props.handleSubmit(formValues =>
                  updateProfile(formValues)
                )}
              >
                <Form.Group inline>
                  <label>Tell us your status: </label>
                  <Field
                    component={RadioButton}
                    label="Single"
                    type="radio"
                    value="single"
                    name="status"
                  />
                  <Field
                    component={RadioButton}
                    label="Relationship"
                    type="radio"
                    value="relationship"
                    name="status"
                  />
                  <Field
                    component={RadioButton}
                    label="Married"
                    type="radio"
                    value="married"
                    name="status"
                  />
                </Form.Group>
                <Divider />
                <label>Tell us about yourself</label>
                <Field
                  component={TextArea}
                  placeholder="About Me"
                  name="aboutMe"
                />
                <Field
                  component={SelectInput}
                  multiple={true}
                  options={interests}
                  name="interests"
                />
                <Field
                  component={TextInput}
                  placeholder="Occupation"
                  type="text"
                  name="occupation"
                />

                <Field
                  component={TextInput}
                  placeholder="Country of Origin"
                  type="text"
                  name="originCountry"
                />

                <Divider />
                <Button
                  disabled={loading || props.invalid || props.pristine}
                  size="large"
                  positive
                  content="Update Profile"
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
            margin-top: 10vh;
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
    reduxForm<FormValues, Props>({
      form: "about",
      enableReinitialize: true,
      destroyOnUnmount: false
    })(about)
  )
);
