import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Grid, Segment, Header, Form, Select, Button } from "semantic-ui-react";
const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];
export class event extends Component {
  render() {
    return (
      <Layout title="New Event">
        <div className="profile">
          <Grid stackable>
            <Grid.Column width={14}>
              <Segment clearing>
                <Header sub color="teal" content="Event Details" />
                <Form>
                  <Form.Field
                  //    error={touched && !!error}
                  >
                    <input type="text" />
                    {/* {touched && error && (
        <Label basic color="red">
          {error}{" "}
        </Label>
      )} */}
                  </Form.Field>
                  <Form.Field
                  // error={touched && !!error}
                  >
                    <Select
                      // value={input.value || null}
                      // onChange={(e, data) => input.onChange(data.value)}
                      options={category}
                      // multiple={multiple}
                      // type={type}
                    />
                    {/* {touched && error && (
        <Label basic color="red">
          {error}{" "}
        </Label>
      )} */}
                  </Form.Field>
                  <Form.Field>
                    <textarea />
                    {/* {touched && error && (
        <Label basic color="red">
          {error}{" "}
        </Label>
      )} */}
                  </Form.Field>
                  <Header sub color="teal" content="Event Location Details" />
                  <Form.Field
                  //    error={touched && !!error}
                  >
                    <input type="text" />
                    {/* {touched && error && (
        <Label basic color="red">
          {error}{" "}
        </Label>
      )} */}
                  </Form.Field>
                  <Form.Field
                  //    error={touched && !!error}
                  >
                    <input type="text" />
                    {/* {touched && error && (
        <Label basic color="red">
          {error}{" "}
        </Label>
      )} */}
                  </Form.Field>
                  {/* <Field
                  name="date"
                  component={DateInput}
                  dateFormat="dd LLL yyyy h:mm a"
                  showTimeSelect
                  timeFormat="HH:mm"
                  placeholder="Event Date"
                /> */}

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

export default event;
