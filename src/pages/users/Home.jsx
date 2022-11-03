import React from "react";
import { Container } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import ProfileModule from "../../module/users/Profile/Profile";
import ToDoModule from "../../module/users/ToDo";
import ScheduleModule from "../../module/users/schedule/Schedule";

function Home() {
  return (
    <Container sx={{ boxSizing: "border-box" }}>
      <Grid
        container
        rowSpacing={1}
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ padding: 3, width: 1300, boxSizing: "border-box" }}
      >
        <Grid xs={6}>
          <ProfileModule />
        </Grid>
        <Grid xs={6}>
          <ScheduleModule />
        </Grid>
        <Grid xs={6}>
          <ToDoModule />
        </Grid>
        <Grid xs={6}></Grid>
      </Grid>
    </Container>
  );
}

export default Home;
