import React, { useEffect, useMemo, useState } from "react";
import SidebarModule from "../../modules/admin/SidebarModule";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { users } from "../../data/testdata.json";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import { Link } from "react-router-dom";

import customAxios from "../../lib/customAxios";
import { Container } from "@mui/system";

function UserData() {
  const [usersInfo, setUsersInfo] = useState([]);
  const getUsersInfo = async (fillter = "every") => {
    const { data } = await customAxios.get(`/user/${fillter}`);
    console.log(data);
    setUsersInfo(data.user_list);
  };
  const [fillter, setFillter] = useState(1);

  useEffect(() => {
    if (fillter === 1) {
      getUsersInfo("every");
    } else if (fillter === 2) {
      getUsersInfo("officegoing");
    } else if (fillter === 3) {
      getUsersInfo("quitting");
    }
  }, [fillter]);

  return (
    <SidebarModule>
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mt: 3,
            mb: 3,
          }}
        >
          {/* <Typography>Manage Users</Typography> */}
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fillter}
              label="보기"
              sx={{
                width: 100,
                position: "absolute",
                top: 20,
                right: 50,
                zIndex: 1,
              }}
              onChange={(e) => {
                setFillter(e.target.value);
              }}
            >
              <MenuItem value={1}>전체</MenuItem>
              <MenuItem value={2}>출근</MenuItem>
              <MenuItem value={3}>퇴근</MenuItem>
            </Select>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {usersInfo.map((user) => {
                return (
                  <Link to={`/admin/id?id=${user.id}`}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name}
                        secondary={`소속:${
                          user.user_application ? user.user_application : "무"
                        }`}
                      />{" "}
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </Container>
        </Box>
      </Box>
    </SidebarModule>
  );
}

export default UserData;
