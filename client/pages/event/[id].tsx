import React, { Component } from "react";
import EventDetailedHeader from "../../components/eventDetailedHeader/EventDetailedHeader";
import Layout from "../../components/Layout";
import { Grid } from "semantic-ui-react";
import EventDetailedInfo from "../../components/eventDetailedInfo/EventDetailedInfo";
import EventDetailedChat from "../../components/eventDetailedChat/EventDetailedChat";
import EventDetailedSidebar from "../../components/eventDetailedSideBar/EventDetailedSidebar";
import { User } from "../../interfaces/User";

interface Props {
  user: User | null;
}

export class event extends Component<Props> {
  render() {
    return (
      <Layout title="Event" user={this.props.user}>
        <div className="profile">
          <Grid stackable>
            <Grid.Column width={10}>
              <EventDetailedHeader />
              <EventDetailedInfo />
              <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
              <EventDetailedSidebar />
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
  }
}

export default event;
