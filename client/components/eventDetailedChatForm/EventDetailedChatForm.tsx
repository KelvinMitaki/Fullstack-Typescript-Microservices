import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import TextArea from "../TextArea";

interface EventDetailedChatFormInterface {
  eventId: number;
  reset?: Function;
  addEventComment?: Function;
  handleCloseReplyForm?: Function;
  parentId: number;
  form: string;
}

class EventDetailedChatForm extends Component<EventDetailedChatFormInterface> {
  handleCommentSubmit = (formValues: { userId: string; comment: string }) => {
    const {
      eventId,
      reset,
      addEventComment,
      handleCloseReplyForm,
      parentId
    } = this.props;
    addEventComment && addEventComment(eventId, formValues, parentId);
    reset && reset();
    if (parentId !== 0) {
      handleCloseReplyForm && handleCloseReplyForm();
    }
  };
  render() {
    return (
      <Form>
        <TextArea placeholder="Chat" />
        <Button
          disabled={true}
          loading={false}
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    );
  }
}
export default EventDetailedChatForm;
