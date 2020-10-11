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
import { Event } from "../../interfaces/Event";
import Axios from "axios";

const panes = [
  { menuItem: "All Events", pane: { key: "allEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Future Events", pane: { key: "futureEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } }
];

interface ProfileInterface extends UserWithEvents {
  user: User | null;
  profileUser: User | null;
  errorStatus: number | null;
  following: boolean;
}

interface UserWithEvents {
  eventUser: {
    _id: string;
    name: string;
    photos: string[];
    version: number;
    events: Event[];
  };
}

interface State {
  loading: boolean;
}

export class Profile extends Component<ProfileInterface, State> {
  constructor(props: ProfileInterface) {
    super(props);
    this.state = {
      loading: false
    };
  }
  static async getInitialProps(context: NextPageContext) {
    try {
      const { data } = await buildClient(context).get(
        `/api/user/profile/${context.query.userId}`
      );
      const res = await buildClient(context).get(
        `/api/event/user/${context.query.userId}`
      );

      const r = await buildClient(context).get("/api/user/current_user");
      const loggedInUserId = r.data.currentUser._id;
      const following = data.followers?.find(
        (fol: any) => fol._id === loggedInUserId
      );
      return { profileUser: data, eventUser: res.data, following };
    } catch (error) {
      // IF ERRROR REDIRECT TO ERROR PAGE
      return { errorStatus: error.response.status };
    }
  }
  followUser = async (userId: string): Promise<void> => {
    try {
      this.setState({ loading: true });
      await Axios.post(`/api/user/follow/${userId}`);
      Router.push("/profile/[userId]", `/profile/${userId}`);
      this.setState({ loading: false });
    } catch (error) {
      console.log(error.response.data);
      this.setState({ loading: false });
    }
  };
  unfollowUser = async (userId: string): Promise<void> => {
    try {
      this.setState({ loading: true });
      await Axios.post(`/api/user/unfollow/${userId}`);
      Router.push("/profile/[userId]", `/profile/${userId}`);
      this.setState({ loading: false });
    } catch (error) {
      console.log(error.response.data);
      this.setState({ loading: false });
    }
  };
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
      console.log(this.props.profileUser);
      return (
        <Layout title="Profile">
          <div className="profile">
            <Grid stackable>
              <Grid.Column width={16}>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        avatar
                        size="small"
                        src={
                          photos?.length !== 0
                            ? `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${
                                photos![0]
                              }`
                            : "/1.png"
                        }
                      />
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
                <Grid.Column width={12}>
                  <Segment attached>
                    <h1>Followers</h1>
                    {followers?.length !== 0 &&
                      followers?.map(fol => (
                        <div
                          key={fol._id}
                          onClick={() =>
                            Router.push(
                              "/profile/[userId]",
                              `/profile/${fol._id}`
                            )
                          }
                        >
                          <Image.Group
                            size="small"
                            style={{ cursor: "pointer" }}
                          >
                            {fol.photos.length !== 0 ? (
                              <Image
                                src={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${fol.photos[0]}`}
                              />
                            ) : (
                              <Image src="/1.png" />
                            )}
                          </Image.Group>
                          <strong>
                            <h3>
                              {fol.firstName} {fol.lastName}
                            </h3>
                          </strong>
                        </div>
                      ))}
                  </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Segment attached>
                    <h1>Following</h1>
                    {following?.length !== 0 &&
                      following?.map(fol => (
                        <div
                          key={fol._id}
                          onClick={() =>
                            Router.push(
                              "/profile/[userId]",
                              `/profile/${fol._id}`
                            )
                          }
                        >
                          <Image.Group
                            size="small"
                            style={{ cursor: "pointer" }}
                          >
                            {fol.photos.length !== 0 ? (
                              <Image
                                src={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${fol.photos[0]}`}
                              />
                            ) : (
                              <Image src="/1.png" />
                            )}
                          </Image.Group>
                          <strong>
                            <h3>
                              {fol.firstName} {fol.lastName}
                            </h3>
                          </strong>
                        </div>
                      ))}
                  </Segment>
                </Grid.Column>
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
                          <React.Fragment>
                            {this.props.following ? (
                              <Button
                                loading={this.state.loading}
                                onClick={() =>
                                  this.unfollowUser(
                                    Router.query.userId as string
                                  )
                                }
                                color="red"
                                fluid
                                basic
                                content="Unfollow"
                              />
                            ) : (
                              <Button
                                loading={this.state.loading}
                                onClick={() =>
                                  this.followUser(Router.query.userId as string)
                                }
                                color="teal"
                                fluid
                                basic
                                content="Follow"
                              />
                            )}
                          </React.Fragment>
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
                    onTabChange={(e, data) => {
                      // @ts-ignore
                      console.log(e.target.value);
                      console.log(data.panes![0].pane!);
                    }}
                    panes={panes}
                    menu={{ secondary: true, pointing: true }}
                  />
                  <br />

                  <Card.Group stackable itemsPerRow={5}>
                    {this.props.eventUser.events.length !== 0 &&
                      this.props.eventUser.events.map(event => (
                        <Card
                          as="a"
                          key={event._id}
                          onClick={() =>
                            Router.push("/event/[id]", `/event/${event._id}`)
                          }
                        >
                          {/* MAKE REQUEST TO FETCH EVENT DETAILS */}
                          <Image src="/1.png" />
                          <Card.Content>
                            <Card.Header textAlign="center">
                              {event.description}
                            </Card.Header>
                            <Card.Meta textAlign="center">
                              {new Date(event.date).toDateString()}
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
