import React, { Component } from "react";
import Router from "next/router";
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
import { NextPageContext } from "next";
import ErrorPage from "next/error";
import { User } from "../../interfaces/User";
import Layout from "../../components/Layout";
import withAuth from "../../hocs/withAuth";
import buildClient from "../../api/build-client";
import { UserContext } from "../../contexts/userContext";

const panes = [
  { menuItem: "All Events", pane: { key: "allEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Future Events", pane: { key: "futureEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } }
];

interface ProfileInterface {
  user: User | null;
  profileUser: User | null;
  errorStatus: number | null;
}

export class Profile extends Component<ProfileInterface> {
  static async getInitialProps(context: NextPageContext) {
    try {
      const { data } = await buildClient(context).get(
        `/api/user/profile/${context.query.userId}`
      );
      return { profileUser: data };
    } catch (error) {
      // IF ERRROR REDIRECT TO ERROR PAGE
      return { errorStatus: error.response.status };
    }
  }
  render() {
    if (this.props.errorStatus) {
      return <ErrorPage statusCode={this.props.errorStatus} />;
    }
    if (this.props.profileUser) {
      const {
        firstName,
        lastName,
        createdAt,
        homeTown,
        birthDate,
        email,
        aboutMe,
        events,
        followers,
        following,
        gender,
        hobbies,
        interests,
        knownAs,
        occupation,
        originCountry,
        photos,
        status
      } = this.props.profileUser;
      return (
        <Layout title="Profile">
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
                        {occupation && <Header as="h3">{occupation} </Header>}
                        <br />
                        <Header as="h3">
                          {birthDate && new Date(birthDate) + " years, "}{" "}
                          {homeTown && `Lives in ${homeTown}`}
                        </Header>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column width={12}>
                <Segment>
                  <Grid columns={2}>
                    <Grid.Column width={10}>
                      <Header icon="smile" content={`About ${firstName}`} />
                      {occupation && (
                        <p>
                          I am a: <strong>{occupation}</strong>
                        </p>
                      )}
                      {homeTown && (
                        <p>
                          Originally from <strong>{homeTown} </strong>
                        </p>
                      )}

                      <p>
                        Member Since:{" "}
                        <strong>{new Date(createdAt).toDateString()} </strong>
                      </p>
                      {aboutMe && (
                        <p>
                          Description of the user:
                          <strong>{aboutMe}</strong>
                        </p>
                      )}
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Header icon="heart outline" content="Interests" />
                      {interests && interests.length !== 0
                        ? interests.map(interest => (
                            <List key={interest}>
                              <Item>
                                <Icon name="heart" />
                                <Item.Content>{interest} </Item.Content>
                              </Item>
                            </List>
                          ))
                        : "No interests for this user"}
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                <Segment>
                  <UserContext.Consumer>
                    {({ user }) => (
                      <React.Fragment>
                        {user?._id === this.props.profileUser?._id ? (
                          <Button
                            onClick={() => Router.push("/settings/basics")}
                            color="teal"
                            fluid
                            basic
                            content="Edit Profile"
                          />
                        ) : (
                          <Button
                            // onClick={async () => await followUser(user)}
                            color="teal"
                            fluid
                            basic
                            content="Follow"
                          />
                        )}
                      </React.Fragment>
                    )}
                  </UserContext.Consumer>
                </Segment>
              </Grid.Column>
              <Grid.Column width={12}>
                <Segment attached>
                  <Header icon="image" content="Photos" />
                  <Image.Group size="small">
                    {photos && photos.length !== 0 ? (
                      photos.map(photo => (
                        <Image
                          key={photo}
                          src={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${photo}`}
                        />
                      ))
                    ) : (
                      <Image src="/1.png" />
                    )}
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
                    {events &&
                      events.length !== 0 &&
                      events.map(event => (
                        <Card as="a" to={`/events/${event._id}`}>
                          {/* MAKE REQUEST TO FETCH EVENT DETAILS */}
                          <Image src="/1.png" />
                          <Card.Content>
                            <Card.Header textAlign="center">
                              Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit. Harum, laboriosam?
                            </Card.Header>
                            <Card.Meta textAlign="center">
                              2 May 2020 21:33
                            </Card.Meta>
                          </Card.Content>
                        </Card>
                      ))}
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

export default withAuth(Profile);
