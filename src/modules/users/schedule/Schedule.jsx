import React from "react";
import { Card, Box } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Chip } from "@mui/material";
import { styled } from '@mui/material';

/////////////
const ScheduleCard = styled(Card)(({ theme }) => ({
  width: 600,
  height: 270,
  boxSizing: "border-box",
  color: "darkslategray",
  padding: "20px 30px 40px 30px",
  backgroundColor: "aliceblue",
  borderRadius: 4,
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
    margin: '0px 10px 0px 10px'
  },
}));

const ButtonWarpper = styled(Button)(({ theme }) => ({
  width: 78,
  cursor: "default",
  backgroundColor: "#2196f3",
  height: 50,
  [theme.breakpoints.down('sm')]: {
    width: '11.5vw',
  },
}));

const BorderWapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 3,
  border: "1px solid #757575",
}));

const ChipBox = styled(Box)(({ theme }) => ({
  width: 75,
  textAlign: "center",
  cursor: "default",
  [theme.breakpoints.down('sm')]: {
    width: '11vw',
  },
}));

const Chipwrapper = styled(Chip)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '9.5vw',
  },
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
  [theme.breakpoints.down('sm')]: {
    width: '77vw',
    
  },
}));
////////////////

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
          <ButtonWarpper
            variant="contained"
          >
            {day}
          </ButtonWarpper>
        ))}
      </ButtonGroup>
      <BorderWapper>
        {workingTimes.map((workingTime) => {
          return (
            <ChipBox>
              <Chipwrapper label="출근" variant="outlined" color="success"></Chipwrapper>
              <p>08:20</p>
              <Chipwrapper label="퇴근" variant="outlined" color="error" />
              <p>16:20</p>
            </ChipBox>
          );
        })}
      </BorderWapper>
      <BorderLinearProgress variant="determinate" value={70} />
    </ScheduleCard>
  );
}
