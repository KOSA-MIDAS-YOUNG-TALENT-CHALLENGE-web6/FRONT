import React from "react";
import { Container } from "@mui/system";
import ProfileModule from "../../modules/users/Profile/Profile";
import ToDoModule from "../../modules/users/Todo/ToDo";
import ScheduleModule from "../../modules/users/schedule/Schedule";
import { Box } from "@mui/material";
import TimerModule from "../../modules/users/Timer/Timer";

function Home() {
  return (
    <Container
      maxWidth={false}
      sx={{
        padding: "24px",
        margin: "0",
        display: "flex",
        flexWrap: "wrap",
        boxSizing: "border-box",
        justifyContent: "center",
        width: "100vw",
        gap: 4,
      }}
    >
      <Box>
        <ProfileModule />
      </Box>
      <Box>
        <ScheduleModule />
      </Box>
      <Box>
        <ToDoModule />
      </Box>
      <Box>
        <TimerModule />
      </Box>
    </Container>
  );
}

export default Home;
