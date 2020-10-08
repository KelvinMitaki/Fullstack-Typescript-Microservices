import React, { Component, useState } from "react";
import Layout from "../../../components/Layout";
import { Grid, Segment, Header, Form, Button } from "semantic-ui-react";
import withAuth from "../../../hocs/withAuth";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import TextInput from "../../../components/reduxForm/TextInput";
import TextArea from "../../../components/TextArea";
import SelectInput from "../../../components/SelectInput";
import DateInput from "../../../components/DateInput";
import Axios from "axios";
import Router from "next/router";
import { Event } from "../../../interfaces/Event";
import { NextPageContext } from "next";
import buildClient from "../../../api/build-client";
import ErrorPage from "next/error";

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

interface EventFormValues {
  name: string;
  type: string;
  description: string;
  city: string;
  town: string;
  date: Date;
}

interface Props {
  initialValues: Event;
  error: number;
}

const ManageEvent = (
  props: InjectedFormProps<EventFormValues, Props> & Props
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const submitEvent = async (formValues: EventFormValues): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      await Axios.post(
        `/api/event/edit/${props.initialValues._id}`,
        formValues
      );
      Router.push("/event/[id]", `/event/${props.initialValues._id}`);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setError("Error updating event, please try again");
      setLoading(false);
    }
  };
  const cancelEvent = async (eventId: string): Promise<void> => {
    try {
    } catch (error) {}
  };
  if (props.error) {
    return <ErrorPage statusCode={props.error} />;
  }
  return (
    <Layout title="New Event">
      <div className="profile">
        <Grid stackable>
          <Grid.Column width={14}>
            <Segment clearing>
              <Header sub color="teal" content="Event Details" />
              <Form
                onSubmit={props.handleSubmit(formValues =>
                  submitEvent(formValues)
                )}
              >
                <Field
                  component={TextInput}
                  placeholder="Event Name"
                  name="name"
                  id="name"
                  type="text"
                />
                <Form.Field>
                  <Field
                    component={SelectInput}
                    multiple={false}
                    options={category}
                    name="type"
                  />
                </Form.Field>
                <Field
                  component={TextArea}
                  placeholder="Event Details"
                  name="description"
                  id="description"
                  type="text"
                />
                <Header sub color="teal" content="Event Location Details" />
                <Field
                  component={TextInput}
                  placeholder="City"
                  name="city"
                  id="city"
                  type="text"
                />
                <Field
                  component={TextInput}
                  placeholder="Town"
                  name="town"
                  id="town"
                  type="text"
                />
                <Field
                  name="date"
                  component={DateInput}
                  dateFormat="dd LLL yyyy h:mm a"
                  showTimeSelect
                  timeFormat="HH:mm"
                  placeholder="Event Date"
                />

                <Button
                  loading={loading}
                  disabled={
                    props.pristine ||
                    props.submitting ||
                    props.invalid ||
                    loading
                  }
                  positive
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  //   onClick={() => {
                  //   }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={props.initialValues.cancelled}
                  type="button"
                  color="red"
                  floated="right"
                  content="Cancel event"

                  //   onClick={() => cancelEvent(Router.query)}
                />
                {console.log(Router.query)}
                <h5 style={{ color: "red" }}>{error}</h5>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
      <style jsx>{`
        .profile {
          margin-top: 35vh;
        }
        @media screen and (min-width: 760px) {
          .profile {
            margin-top: 15vh;
          }
        }
      `}</style>
    </Layout>
  );
};
const validate = (formValues: EventFormValues) => {
  const errors: { [key: string]: string } = {};
  if (!formValues.name || (formValues.name && !formValues.name.trim())) {
    errors.name = "Please enter a valid event name";
  }
  if (!formValues.type || (formValues.type && !formValues.type.trim())) {
    errors.type = "Please choose a valid event type";
  }
  if (
    !formValues.description ||
    (formValues.description && formValues.description.trim().length < 20)
  ) {
    errors.description = "Event description must be 20 characters or more";
  }
  if (!formValues.city || (formValues.city && !formValues.city.trim())) {
    errors.city = "Please enter a valid city";
  }
  if (!formValues.town || (formValues.town && !formValues.town.trim())) {
    errors.town = "Please enter a valid town";
  }
  if (!formValues.date) {
    errors.date = "Please choose a valid date";
  }
  return errors;
};

ManageEvent.getInitialProps = async (ctx: NextPageContext) => {
  try {
    const { data } = await buildClient(ctx).get(
      `/api/event/single/${ctx.query.eventId}`
    );
    return { initialValues: data };
  } catch (error) {
    return { error: error.response.status };
  }
};

export default withAuth(
  reduxForm<EventFormValues, Props>({ form: "event", validate })(ManageEvent)
);
