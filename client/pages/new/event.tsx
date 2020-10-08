import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Grid, Segment, Header, Form, Select, Button } from "semantic-ui-react";
import withAuth from "../../hocs/withAuth";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import TextInput from "../../components/reduxForm/TextInput";
import TextArea from "../../components/TextArea";
import SelectInput from "../../components/SelectInput";
import DateInput from "../../components/DateInput";
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
  date: string;
}

export class event extends Component<InjectedFormProps<EventFormValues>> {
  render() {
    return (
      <Layout title="New Event">
        <div className="profile">
          <Grid stackable>
            <Grid.Column width={14}>
              <Segment clearing>
                <Header sub color="teal" content="Event Details" />
                <Form>
                  <Field
                    component={TextInput}
                    placeholder="Event Name"
                    name="name"
                    id="name"
                    type="text"
                  />
                  <Form.Field
                  // error={touched && !!error}
                  >
                    <Field
                      component={SelectInput}
                      multiple={false}
                      options={category}
                      name="type"
                    />
                    {/* {touched && error && (
        <Label basic color="red">
          {error}{" "}
        </Label>
      )} */}
                    <Field
                      component={TextInput}
                      placeholder="Event Name"
                      name="name"
                      id="name"
                      type="text"
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
                    //   loading={loading}
                    //   disabled={pristine || submitting || invalid}
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
                    //   disabled={event.length < 1}
                    type="button"
                    color="red"
                    floated="right"
                    content="Cancel event"

                    //   onClick={() => {
                    //     cancelEventToggle(!event[0].cancelled, event[0].id);
                    //   }}
                  />
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
  }
}

export default withAuth(
  reduxForm<EventFormValues>({ form: "event" })(event)
);
