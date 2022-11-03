import React from "react";
import { atom } from "recoil";

export const hourTime = atom({
  key: "HourTime",
  default: "",
});

export const minTime = atom({
  key: "MinTime",
  default: "",
});

export const secTime = atom({
  key: "SecTime",
  default: "",
});

export const UserInfo = atom({
  key: "userInfo",
  default: {},
});
