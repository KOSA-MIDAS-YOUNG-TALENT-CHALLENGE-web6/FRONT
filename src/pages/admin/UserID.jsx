import React, { useEffect, useState } from "react";
import SidebarModule from "../../modules/admin/SidebarModule";
import {
  Typography,
  Avatar,
  Stack,
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  circularProgressClasses,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import customAxios from "../../lib/customAxios";

const top100Films = [
  { label: "회장" },
  { label: "부회장" },
  { label: "팀장" },
  { label: "부장" },
  { label: "과장" },
  { label: "사원" },
  { label: "대리" },
];

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

function UserID() {
  const getUsersInfo = async (fillter = "every") => {
    const { data } = await customAxios.get(`/user/${fillter}`);
    console.log(data);
    data.user_list.forEach((user) => {
      if (user.id === id) {
        setUser(user);
        console.log(user);
      }
    });
  };

  const [todos, setTodos] = useState([]);
  const [position, setPosition] = useState("");
  const [application, setApplication] = useState("마이다스인");
  const [user, setUser] = useState({});
  const params = new URLSearchParams(window.location.search);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(user);
  }, [user]);
  let id = params.get("id");
  console.log(id);
  useEffect(() => {
    getUsersInfo();
  }, []);

  const updatePosition = (id) => {
    customAxios.patch(`/user/position/${id}`, { position });
  };

  const updateApplication = (id) => {
    customAxios.patch(`/user/application/${id}`, { application });
  };
  const updateName = (id) => {
    customAxios.patch(`/user/name/${id}`, { name });
  };

  const updateInfo = async () => {
    await updateApplication(id);
    await updateName(id);
    await updatePosition(id);
  };

  const [value, setValue] = React.useState(dayjs("2022-04-07"));

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = value.startOf("week");
    const end = value.endOf("week");

    const dayIsBetween = date.isBetween(start, end, null, "[]");
    const isFirstDay = date.isSame(start, "day");
    const isLastDay = date.isSame(end, "day");

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <SidebarModule>
      <Stack direction="row" spacing={4}>
        <Card sx={{ minWidth: 350, maxWidth: 400, height: "800px" }}>
          <CardContent>
            <Stack spacing={4}>
              <Box>
                <Avatar alt="" src="" sx={{ width: 350, height: 350 }} />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Stack spacing={4}>
                  <Box>
                    <TextField
                      required
                      sx={{ width: 300 }}
                      id="outlined-required"
                      defaultValue={user.name}
                      label="이름"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      required
                      sx={{ width: 300 }}
                      {...params}
                      onChange={(e) => {
                        setPosition(e.target.value);
                      }}
                      label="직급"
                    />
                  </Box>
                  <Box>
                    <TextField
                      required
                      sx={{ width: 300 }}
                      {...params}
                      value={application}
                      // defaultValue={""}
                      label="소속"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setApplication(e.target.value);
                      }}
                      render
                    />
                  </Box>
                  <Button
                    onClick={() => {
                      updateInfo();
                    }}
                  >
                    수정
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
        <Card
          sx={{
            minWidth: 800,
            maxWidth: 800,
            height: "800px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <img
              width={500}
              height={500}
              src={localStorage.getItem("imgUrl")}
              alt=""
            />
          </CardContent>
        </Card>
        <Stack spacing={4}>
          <Card sx={{ minWidth: 350, maxWidth: 400, height: "384px" }}>
            <CardContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  label="Week picker"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderDay={renderWeekPickerDay}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="'Week of' MMM d"
                />
              </LocalizationProvider>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 350,
              maxWidth: 400,
              height: "384px",
              zIndex: "1000",
            }}
          >
            <CardContent>
              <TextField
                sx={{ width: 750 }}
                id="standard-basic"
                label="Todo"
                variant="filled"
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    setTodos((props) => [
                      ...props,
                      { id: props.length, title: e.target.value, done: false },
                    ]);
                  }
                }}
              />
              <FormGroup>
                {todos.map((todo) => (
                  <FormControlLabel
                    key={todo.id}
                    control={
                      todo.done ? <Checkbox defaultChecked /> : <Checkbox />
                    }
                    label={todo.title}
                  />
                ))}
              </FormGroup>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </SidebarModule>
  );
}

export default UserID;
