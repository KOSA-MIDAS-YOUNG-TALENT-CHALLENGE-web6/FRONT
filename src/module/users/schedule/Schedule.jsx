import React from "react";
import { Card, Box } from "@mui/material";
import { styled } from "@mui/system";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
export default function Schedule() {
  return (
    <ScheduleCard>
      <h2>이번 주 근무</h2>
      <BorderLinearProgress variant="determinate" value={70} />
    </ScheduleCard>
  );
}

const ScheduleCard = styled(Card)(({ theme }) => ({
  boxSizing: "border-box",
  color: "darkslategray",
  padding: "20px 30px 40px 30px",
  backgroundColor: "aliceblue",
  borderRadius: 4,
  "&>.info": { display: "flex", justifyContent: "space-around" },
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
