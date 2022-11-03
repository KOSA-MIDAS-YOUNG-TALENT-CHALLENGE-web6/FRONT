import React from "react";
import { Card, Box } from "@mui/material";
import { styled } from "@mui/system";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
export default function Schedule() {
  const weeks = ["월", "화", "수", "목", "토", "일"];
  return (
    <ScheduleCard>
      <h2>이번 주 근무</h2>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #616161",
          justifyContent: "space-around",
        }}
      >
        {weeks.map((day, idx) => {
          return (
            <Box key={idx} sx={{ width: 60, height: 50, textAlign: "center" }}>
              <h3>{day}</h3>
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
