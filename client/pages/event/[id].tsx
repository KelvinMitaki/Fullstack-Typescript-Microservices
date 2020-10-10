import React from "react";
import EventDetailedHeader from "../../components/eventDetailedHeader/EventDetailedHeader";
import Layout from "../../components/Layout";
import { Grid } from "semantic-ui-react";
import EventDetailedInfo from "../../components/eventDetailedInfo/EventDetailedInfo";
import EventDetailedChat from "../../components/eventDetailedChat/EventDetailedChat";
import EventDetailedSidebar from "../../components/eventDetailedSideBar/EventDetailedSidebar";
import { User } from "../../interfaces/User";
import { NextPageContext } from "next";
import buildClient from "../../api/build-client";
import { Event } from "../../interfaces/Event";
import ErrorPage from "next/error";
import { EventContext } from "../../contexts/eventContext";

interface Props {
  user: User | null;
  event: Event;
  error?: number | null;
}

const event = (props: Props) => {
  if (props.error) {
    return <ErrorPage statusCode={props.error} />;
  }
  return (
    <Layout title="Event" user={props.user}>
      <EventContext.Provider value={{ event: props.event }}>
        <div className="profile">
          <Grid stackable>
            <Grid.Column width={10}>
              <EventDetailedHeader />
              <EventDetailedInfo />
              {/* <EventDetailedChat /> */}
            </Grid.Column>
            <Grid.Column width={6}>
              <EventDetailedSidebar />
            </Grid.Column>
          </Grid>
        </div>
      </EventContext.Provider>
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

event.getInitialProps = async (context: NextPageContext) => {
  try {
    const { data } = await buildClient(context).get(
      `/api/event/single/${context.query.id}`
    );

    return { event: data };
  } catch (error) {
    return { error: error.response.status };
  }
};

export default event;
