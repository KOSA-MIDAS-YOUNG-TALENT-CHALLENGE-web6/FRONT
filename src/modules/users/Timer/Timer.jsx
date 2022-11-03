import React from "react";
import { styled } from "@mui/system";
import { Card, CircularProgress, circularProgressClasses } from "@mui/material";
import { useState } from "react";
export default function Timer() {
  const [progress, setProgress] = useState(10);

  return (
    <ProfileCard>
      <CircularProgress
        variant="determinate"
        sx={{
          position: "absolute",
          top: 40,
          left: 60,
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={300}
        thickness={4}
        value={100}
      />
      <CircularProgress
        disableShrink
        variant="determinate"
        size={300}
        value={progress}
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
          position: "absolute",
          top: 40,
          left: 60,
        }}
        thickness={4}
      />
    </ProfileCard>
  );
}

const ProfileCard = styled(Card)(({ theme }) => ({
  position: "relative",
  width: 450,
  height: 400,
  display: "flex",
  boxSizing: "border-box",
  color: "darkslategray",
  backgroundColor: "aliceblue",
  borderRadius: 4,
}));
