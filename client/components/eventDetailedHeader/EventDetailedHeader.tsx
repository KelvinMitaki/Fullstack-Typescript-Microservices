import React, { useContext } from "react";
import { Segment, Image, Header, Item, Button, Label } from "semantic-ui-react";
import Link from "next/link";
import { EventContext } from "../../contexts/eventContext";
import { UserContext } from "../../contexts/userContext";

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
  const { event } = useContext(EventContext);
  const { user } = useContext(UserContext);
  // return singleEvent.map((event) => {
  //   const test = new Date(event.date.toDate());
  //   const arr = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "June",
  //     "July",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   const year = test.getFullYear();
  //   const month = arr[test.getMonth()];

  //   const day = test.getDate();
  //   const hour = test.getHours();

  //   let minutes = test.getMinutes();
  //   minutes = minutes === 0 ? "00" : minutes;
  //   const newUser = Object.keys(event.attendees).map((key) => {
  //     return {
  //       id: key,
  //       ...event.attendees[key],
  //     };
  //   });
  //   const isGoing = newUser.some((u) => u.id === uid);
  //   let eventCheck;

  //   if (!isGoing && authenticated && !event.cancelled) {
  //     eventCheck = (
  //       <Button onClick={() => goingToEvent(event)} color="teal">
  //         JOIN THIS EVENT
  //       </Button>
  //     );
  //   } else if (!isGoing && authenticated && event.cancelled) {
  //     eventCheck = (
  //       <Label
  //         size="large"
  //         color="red"
  //         content="This event has been cancelled"
  //       />
  //     );
  //   } else if (!authenticated && !event.cancelled) {
  //     eventCheck = (
  //       <Button onClick={() => openModal("UnAuthModal")} color="teal">
  //         JOIN THIS EVENT
  //       </Button>
  //     );
  //   } else if (!authenticated && event.cancelled) {
  //     eventCheck = (
  //       <Label
  //         size="large"
  //         color="red"
  //         content="This event has been cancelled"
  //       />
  //     );
  //   }

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
            {user && user._id !== event?.user._id && (
              <Button>Cancel My Place</Button>
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
