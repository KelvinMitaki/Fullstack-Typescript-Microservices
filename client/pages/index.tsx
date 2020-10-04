import React, { Component } from "react";
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
import { UserContext, UserContextProps } from "../contexts/userContext";
import withAuth from "../hocs/withAuth";

interface Props {
  user: User | null;
  test: string;
}

export class events extends Component<Props> {
  render() {
    return (
      <Layout title="Events" user={this.props.user}>
        <div className="profile">
          <Segment.Group>
            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image size="tiny" circular src="/1.png" />
                  <Item.Content>
                    <Item.Header as="a" to={`/events/`}>
                      {" "}
                      My title
                    </Item.Header>
                    <Item.Description>
                      Hosted by{" "}
                      <strong>
                        <Link href={`/profile/`}>
                          <a>kevin mitaki</a>
                        </Link>
                      </strong>
                    </Item.Description>
                    {/* {event.cancelled && ( */}
                    <Label
                      style={{ top: "-40px" }}
                      ribbon="right"
                      color="red"
                      content="This event has been cancelled"
                    />
                    {/* )} */}
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
            <Segment>
              <span>
                <Icon name="clock" />
                {`monday  feb  2020 21:00`} |
                <Icon name="marker" /> time
              </span>
            </Segment>
            <Segment secondary>
              <List horizontal>
                <List.Item>
                  <Image
                    as="a"
                    //   to={`/profile/${attendee.id}`}
                    size="mini"
                    circular
                    src="/1.png"
                  />
                </List.Item>
                <List.Item>
                  <Image
                    as="a"
                    //   to={`/profile/${attendee.id}`}
                    size="mini"
                    circular
                    src="/1.png"
                  />
                </List.Item>
                <List.Item>
                  <Image
                    as="a"
                    //   to={`/profile/${attendee.id}`}
                    size="mini"
                    circular
                    src="/1.png"
                  />
                </List.Item>
              </List>
            </Segment>
            <Segment clearing>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium, eos placeat, molestiae laborum assumenda dignissimos
                provident tempora mollitia iste molestias natus facere eius
                cumque quas eveniet, repellendus vel quidem qui quaerat neque
                labore. Perspiciatis laudantium blanditiis hic possimus eaque
                delectus, beatae dignissimos quo, ducimus minima, voluptates
                autem velit illo rerum.
              </p>

              <Button
                onClick={() => Router.push("/event/[id]", "/event/123")}
                color="teal"
                floated="right"
                content="View"
              />
            </Segment>
          </Segment.Group>
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

export default withAuth(events);
