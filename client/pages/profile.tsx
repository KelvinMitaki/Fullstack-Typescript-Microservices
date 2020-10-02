import React, { Component } from "react";
import Layout from "../components/Layout";
import router from "next/router";
import {
  Grid,
  Segment,
  Item,
  Header,
  List,
  Image,
  Tab,
  Card,
  Icon,
  Button
} from "semantic-ui-react";
import { User } from "../interfaces/User";
import { NextPageContext } from "next";

const panes = [
  { menuItem: "All Events", pane: { key: "allEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Future Events", pane: { key: "futureEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } }
];

interface ProfileInterface {
  user: User | null;
}

export class Profile extends Component<ProfileInterface> {
  render() {
    if (this.props.user) {
      const { firstName, lastName, createdAt } = this.props.user;
      return (
        <Layout title="Profile" user={this.props.user}>
          <div className="profile">
            <Grid stackable>
              <Grid.Column width={16}>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image avatar size="small" src="/1.png" />
                      <Item.Content verticalAlign="bottom">
                        <Header as="h1">
                          {firstName} {lastName}{" "}
                        </Header>
                        <br />
                        <Header as="h3">programmer </Header>
                        <br />
                        <Header as="h3">20 years `Lives in Rongai</Header>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column width={12}>
                <Segment>
                  <Grid columns={2}>
                    <Grid.Column width={10}>
                      <Header icon="smile" content="About Display Name" />

                      <p>
                        I am a: <strong>programmer</strong>
                      </p>

                      <p>
                        Originally from <strong>Rongai </strong>
                      </p>

                      <p>
                        Member Since:{" "}
                        <strong>{new Date(createdAt).toDateString()} </strong>
                      </p>
                      <p>
                        Description of the user:
                        <strong>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Repellendus sunt nulla iusto quae laborum
                          delectus ducimus nihil voluptatibus culpa. Provident?
                        </strong>
                      </p>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Header icon="heart outline" content="Interests" />
                      <List>
                        <Item key={Math.random()}>
                          <Icon name="heart" />
                          <Item.Content>programming </Item.Content>
                        </Item>
                      </List>
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                <Segment>
                  <Button
                    // onClick={async () => await followUser(user)}
                    color="teal"
                    fluid
                    basic
                    content="Follow"
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={12}>
                <Segment attached>
                  <Header icon="image" content="Photos" />

                  <Image.Group size="small">
                    <Image src="/1.png" />
                  </Image.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column width={12}>
                <Segment attached loading={false}>
                  <Header icon="calendar" content="Events" />
                  <Tab
                    //   onTabChange={(e, data) =>
                    //     this.props.getUserEvents(
                    //       this.props.match.params.id,
                    //       data.activeIndex
                    //     )
                    //   }

                    panes={panes}
                    menu={{ secondary: true, pointing: true }}
                  />
                  <br />

                  <Card.Group stackable itemsPerRow={5}>
                    <Card as="a" to={`/events/`}>
                      <Image src="/1.png" />
                      <Card.Content>
                        <Card.Header textAlign="center">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Harum, laboriosam?
                        </Card.Header>
                        <Card.Meta textAlign="center">
                          2 May 2020 21:33
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Card.Group>
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
    } else {
      return null;
    }
  }
}
export default Profile;
