import React, { Fragment } from "react";
import { Segment, Item, Label } from "semantic-ui-react";
import Link from "next/link";

const EventDetailedSidebar = () => {
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
        2 people going
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
                <Link href={`/profile`}>
                  <a>kevin</a>
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
