import React from "react";
import { styled } from "@mui/system";
import { Card, CircularProgress, circularProgressClasses } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { hourTime, minTime, secTime, UserInfo } from "../../../recoil/atom";
import customAxios from "../../../lib/customAxios";
import { useRecoilState } from "recoil";
import { Box } from "@mui/material";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

export default function Timer() {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [progress, setProgress] = useState(10);
  const [workTime, setWorkTime] = useState(null);

  const getTodayWorkTime = async () => {
    const { data } = await customAxios.get("/user/today");
    console.log(data);
    setWorkTime(data);
  };

  //Time
  let now = new Date();

  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [sec, setSec] = useState();

  const [nowHour, setNowHour] = useState(padNumber(now.getHours(), 2));
  const [nowMin, setNowMin] = useState(padNumber(now.getMinutes(), 2));
  const [nowSec, setNowSec] = useState(padNumber(now.getSeconds(), 2));
  const interval = useRef(null);

  useEffect(() => {
    getTodayWorkTime();
  }, []);

  useEffect(() => {
    interval.current = setInterval(() => {
      now = new Date();
      setNowHour(padNumber(now.getHours(), 2));
      setNowMin(padNumber(now.getMinutes(), 2));
      setNowSec(padNumber(now.getSeconds(), 2));
    }, 1000);
    // clean-up 함수 리턴!
    return () => clearInterval(interval.current);
  }, []);

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
      <Box sx={{ position: "absolute", top: 150, left: 150 }}>
        <h2>
          {nowHour} : {nowMin} : {nowSec}
        </h2>
      </Box>
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
