import React, { Fragment, useContext } from "react";
import { Segment, Item, Label } from "semantic-ui-react";
import Link from "next/link";
import { EventContext } from "../../contexts/eventContext";

const EventDetailedSidebar = () => {
  const { event } = useContext(EventContext);
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {event!.attendees.length + 1} people going
      </Segment>
      <Segment attached>
        <Item.Group divided>
          <Item style={{ position: "relative" }}>
            <Label
              style={{ position: "absolute" }}
              color="orange"
              ribbon="right"
            >
              Host
            </Label>

            <Item.Image size="tiny" src={"/1.png"} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link
                  href={`/profile/[userId]`}
                  as={`/profile/${event?.user._id}`}
                >
                  <a>{event?.user.name}</a>
                </Link>
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Fragment>
  );
};
export default EventDetailedSidebar;
