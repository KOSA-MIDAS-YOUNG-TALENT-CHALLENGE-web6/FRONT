import React from "react";
import { Card, Box } from "@mui/material";
import { styled } from "@mui/system";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Chip } from "@mui/material";

export default function Schedule() {
  const weeks = ["월", "화", "수", "목", "금", "토", "일"];
  const workingTimes = [
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
  ];
  return (
    <ScheduleCard>
      {/* <h3>이번 주 근무</h3> */}
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
      >
        {weeks.map((day) => (
          <Button
            sx={{
              width: 78,
              cursor: "default",
              backgroundColor: "#2196f3",
              height: 50,
            }}
            variant="contained"
          >
            {day}
          </Button>
        ))}
      </ButtonGroup>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          border: "1px solid #757575",
        }}
      >
        {workingTimes.map((workingTime) => {
          return (
            <Box
              sx={{
                width: 75,
                textAlign: "center",
                cursor: "default",
              }}
            >
              <Chip label="출근" variant="outlined" color="success"></Chip>
              <p>08:20</p>
              <Chip label="퇴근" variant="outlined" color="error" />
              <p>16:20</p>
            </Box>
          );
        })}
      </Box>
      <BorderLinearProgress variant="determinate" value={70} />
    </ScheduleCard>
  );
}

const ScheduleCard = styled(Card)(({ theme }) => ({
  width: 600,
  height: 270,
  boxSizing: "border-box",
  color: "darkslategray",
  padding: "20px 30px 40px 30px",
  backgroundColor: "aliceblue",
  borderRadius: 4,
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  width: 450,
  height: 15,
  display: "box",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      value >= 65 ? "#348cde" : value >= 35 ? "#ff9800" : "#f44336",
  },
}));
