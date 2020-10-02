import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";

const EventDetailedInfo = () => {
  // const test = new Date(singleEvent.date.toDate());
  // const arr = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "June",
  //   "July",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
  // const year = test.getFullYear();
  // const month = arr[test.getMonth()];

  // const day = test.getDate();
  // const hour = test.getHours();
  // let minutes = test.getMinutes();
  // minutes = minutes === 0 ? "00" : minutes;

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis ipsa quia blanditiis quisquam autem consequuntur
              rerum accusantium voluptatem repudiandae nisi, dolor sed amet
              placeat ipsum unde culpa quos dolore optio ad error consectetur.
              Repellat sed voluptatibus ratione obcaecati nam. Repellat
              doloribus nulla non similique sunt ipsa voluptate aperiam corporis
              officiis.
            </p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span> {`Monday Sep 2020 14:25`}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Rongai </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedInfo;
