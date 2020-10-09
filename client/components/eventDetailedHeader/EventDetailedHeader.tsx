import React, { useContext, useState } from "react";
import { Segment, Image, Header, Item, Button, Label } from "semantic-ui-react";
import Link from "next/link";
import { EventContext } from "../../contexts/eventContext";
import { UserContext } from "../../contexts/userContext";
import Axios from "axios";
import Router from "next/router";

const eventImageStyle = {
  filter: "brightness(30%)"
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

interface EventDetailedHeaderInterface {
  manageEvent?: Function;
  history?: Function;
  singleEvent?: Function;
  uid?: string;
  goingToEvent?: Function;
  cancelGoingToEvent?: Function;
  authenticated?: boolean;
  openModal?: Function;
}

const EventDetailedHeader = ({
  manageEvent,
  history,
  singleEvent,
  uid,
  goingToEvent,
  cancelGoingToEvent,
  authenticated,
  openModal
}: EventDetailedHeaderInterface) => {
  const [joinEventLoading, setJoinEventLoading] = useState<boolean>(false);
  const { event } = useContext(EventContext);
  const { user } = useContext(UserContext);

  const cancelMyPlace = async (eventId: string): Promise<void> => {
    try {
    } catch (error) {}
  };
  const joinEvent = async (eventId: string): Promise<void> => {
    try {
      setJoinEventLoading(true);
      await Axios.post(`/api/event/join/${eventId}`);
      Router.push("/event/[id]", `/event/${eventId}`);
      setJoinEventLoading(false);
    } catch (error) {
      console.log(error);
      setJoinEventLoading(false);
    }
  };

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src="/1.png"
          fluid
          style={{
            filter: "brightness(30%)",
            height: "40vh"
          }}
        />
        {event?.cancelled && (
          <Label
            style={{ top: "-40px" }}
            ribbon="right"
            color="red"
            content="This event has been cancelled"
          />
        )}
        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content="New Event"
                  style={{ color: "white" }}
                />
                <p>{new Date(event!.date).toDateString()}</p>
                <p>
                  Hosted by{" "}
                  <strong>
                    <Link
                      href="/profile/[userId]"
                      as={`/profile/${event?.user._id}`}
                    >
                      <a>{event?.user.name}</a>
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment attached="bottom" clearing>
        <div className="test">
          <React.Fragment>
            {user &&
              user._id !== event?.user._id &&
              !event?.cancelled &&
              !!event!.attendees.find(
                att => att._id.toString() === user._id.toString()
              ) && (
                <Button onClick={() => cancelMyPlace(event!._id)}>
                  Cancel My Place
                </Button>
              )}
            {user &&
              user._id !== event?.user._id &&
              !event?.cancelled &&
              !event!.attendees.find(
                att => att._id.toString() === user._id.toString()
              ) && (
                <Button
                  color="green"
                  floated="right"
                  onClick={() => joinEvent(event!._id)}
                  loading={joinEventLoading}
                  disabled={joinEventLoading}
                >
                  Join This Event
                </Button>
              )}
          </React.Fragment>
          {user && user._id === event?.user._id && !event.cancelled && (
            <Button color="orange" floated="right">
              <Link
                href="/manage/event/[eventId]"
                as={`/manage/event/${event._id}`}
              >
                <a>Manage Event</a>
              </Link>
            </Button>
          )}
        </div>
      </Segment>
      <style jsx>{`
        a {
          color: whitesmoke;
        }
        @media screen and (max-width: 385px) {
          .test {
            display: flex;
            align-items: center;
            align-content: center;
          }
        }
      `}</style>
    </Segment.Group>
  );
};
export default EventDetailedHeader;
