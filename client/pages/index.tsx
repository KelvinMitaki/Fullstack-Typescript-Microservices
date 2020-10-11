import React from "react";
import {
  Image,
  List,
  Segment,
  Item,
  Label,
  Icon,
  Button
} from "semantic-ui-react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/Layout";
import { User } from "../interfaces/User";
import { NextPageContext } from "next";
import { Event } from "../interfaces/Event";
import buildClient from "../api/build-client";

interface Props {
  user: User | null;
  events: Event[];
}

const events = (props: Props) => {
  return (
    <Layout title="Events">
      <div className="profile">
        {props.events.length !== 0 &&
          props.events.map(
            (event: Event): JSX.Element => (
              <Segment.Group key={event._id}>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image size="tiny" circular src="/1.png" />
                      <Item.Content>
                        <Link href={"/event/[id]"} as={`/event/${event._id}`}>
                          <h3>
                            <a>{event.name}</a>
                          </h3>
                        </Link>
                        <Item.Description>
                          Hosted by{" "}
                          <strong>
                            <Link
                              href={`/profile/[userId]`}
                              as={`/profile/${event.user._id}`}
                            >
                              <a>{event.user.name}</a>
                            </Link>
                          </strong>
                        </Item.Description>
                        {event.cancelled && (
                          <Label
                            style={{ top: "-40px" }}
                            ribbon="right"
                            color="red"
                            content="This event has been cancelled"
                          />
                        )}
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
                <Segment>
                  <span>
                    <Icon name="clock" />
                    {/* {`monday  feb  2020 21:00`}  */}
                    {new Date(event.date).toDateString()}
                    |
                    <Icon name="marker" /> time
                  </span>
                </Segment>
                <Segment secondary>
                  <List horizontal>
                    <List.Item>
                      <div
                        onClick={() =>
                          Router.push(
                            "/profile/[userId]",
                            `/profile/${event.user._id}`
                          )
                        }
                      >
                        <Image
                          as="a"
                          size="mini"
                          circular
                          src={
                            event.user.photos.length !== 0
                              ? "https://e-commerce-gig.s3.eu-west-2.amazonaws.com/" +
                                event.user.photos[0]
                              : "/1.png"
                          }
                        />
                      </div>
                    </List.Item>
                    {event.attendees.length !== 0 &&
                      event.attendees.map(att => (
                        <List.Item key={att._id}>
                          <div
                            onClick={() =>
                              Router.push(
                                "/profile/[userId]",
                                `/profile/${att._id}`
                              )
                            }
                          >
                            <Image
                              as="a"
                              size="mini"
                              circular
                              src={
                                att.photos.length !== 0
                                  ? "https://e-commerce-gig.s3.eu-west-2.amazonaws.com/" +
                                    att.photos[0]
                                  : "/1.png"
                              }
                            />
                          </div>
                        </List.Item>
                      ))}
                  </List>
                </Segment>
                <Segment clearing>
                  <p>{event.description}</p>

                  <Button
                    onClick={() =>
                      Router.push("/event/[id]", `/event/${event._id}`)
                    }
                    color="teal"
                    floated="right"
                    content="View"
                  />
                </Segment>
              </Segment.Group>
            )
          )}
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

events.getInitialProps = async (context: NextPageContext) => {
  const res = await buildClient(context).get("/api/event/all");
  return { events: res.data };
};

export default events;
