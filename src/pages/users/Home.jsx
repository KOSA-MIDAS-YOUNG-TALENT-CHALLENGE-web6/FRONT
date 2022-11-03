import React from "react";
import { Container } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import ProfileModule from "../../module/users/Profile/Profile";
import ToDoModule from "../../module/users/ToDo";
import ScheduleModule from "../../module/users/schedule/Schedule";
import { Box } from "@mui/material";

function Home() {
  return (
    <Container 
    maxWidth={false}
    sx={{
      padding: '24px',
      margin: '0',
      display: "flex",
      flexWrap: "wrap",
      boxSizing: "border-box",
      justifyContent: 'center',
      width: '100vw',
      gap: 4 
    }}>
        <Box>
          <ProfileModule/>
        </Box>
        <Box>
          <ScheduleModule />
        </Box>
        <Box>
          <ToDoModule />
        </Box>
        <Box></Box>
    </Container>
  );
}

export default Home;
