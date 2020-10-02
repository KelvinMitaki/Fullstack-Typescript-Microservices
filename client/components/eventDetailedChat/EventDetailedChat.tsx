import React from "react";
import { Segment, Header, Comment } from "semantic-ui-react";
import formatDistance from "date-fns/formatDistance";
import Link from "next/link";
import EventDetailedChatForm from "../eventDetailedChatForm/EventDetailedChatForm";

interface EventDetailedChatInterface {
  comment?: { [key: string]: string };
  child?: { [key: string]: string };
}

class EventDetailedChat extends React.Component<EventDetailedChatInterface> {
  state = {
    replyFormOpen: false,
    commentId: null
  };
  tryFixDate = (date: Date) => {
    return formatDistance(date, Date.now());
  };
  handleOpenReplyForm = (id: string) => {
    this.setState({ replyFormOpen: true, commentId: id });
  };
  handleCloseReplyForm = () => {
    this.setState({ replyFormOpen: false, commentId: null });
  };
  //ALGORITHM FOR SORTING EVENTS AND THEIR CHILDREN
  createDataTree = (dataset: { [key: string]: string }[]) => {
    let hashTable = Object.create(null);
    dataset.forEach(a => (hashTable[a.id] = { ...a, childNodes: [] }));
    let dataTree: { [key: string]: string }[] = [];
    dataset.forEach(a => {
      if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
      else dataTree.push(hashTable[a.id]);
    });
    return dataTree;
  };
  render() {
    // const { match, comments } = this.props;
    const { replyFormOpen, commentId } = this.state;
    // const newComments = comments && this.createDataTree(comments);
    return (
      <React.Fragment>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: "none" }}
        >
          <Header>Chat about this event</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            <Comment>
              <Comment.Avatar src={"/1.png"} />
              <Comment.Content>
                <Comment.Author>
                  <Link href="/profile">
                    <a>kevoh</a>
                  </Link>
                </Comment.Author>
                <Comment.Metadata>
                  <div>15 mins ago</div>
                </Comment.Metadata>
                <Comment.Text>
                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia consequatur dolorem doloremque veniam blanditiis
                    sint. Possimus porro nemo error! At excepturi odio repellat
                    amet inventore velit distinctio tempora sunt nemo!
                  </div>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() =>
                      this.props.comment &&
                      this.handleOpenReplyForm(this.props.comment.id)
                    }
                  >
                    Reply
                  </Comment.Action>
                  {replyFormOpen &&
                    commentId === this.props.comment &&
                    this.props.comment!.id && (
                      <EventDetailedChatForm
                        handleCloseReplyForm={this.handleCloseReplyForm}
                        eventId={1}
                        form={`form`}
                        parentId={0}
                      />
                    )}
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                <Comment>
                  <Comment.Avatar src={"/1.png"} />
                  <Comment.Content>
                    <Comment.Author>
                      <Link href="/profile">
                        <a>kevin</a>
                      </Link>
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>15 mins ago</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nostrum est, nesciunt dignissimos vero magni placeat
                        sequi, a itaque aut porro officiis corrupti eveniet cum
                        molestiae repudiandae perferendis unde voluptates iure.
                      </div>
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={() =>
                          this.props.child &&
                          this.handleOpenReplyForm(this.props.child.id)
                        }
                      >
                        Reply
                      </Comment.Action>
                      {replyFormOpen &&
                        commentId === this.props.child &&
                        this.props.child!.id && (
                          <EventDetailedChatForm
                            handleCloseReplyForm={this.handleCloseReplyForm}
                            eventId={1}
                            form={`name`}
                            parentId={0}
                          />
                        )}
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>
          </Comment.Group>
          <EventDetailedChatForm eventId={1} form={`newComment`} parentId={0} />
        </Segment>
      </React.Fragment>
    );
  }
}
export default EventDetailedChat;
