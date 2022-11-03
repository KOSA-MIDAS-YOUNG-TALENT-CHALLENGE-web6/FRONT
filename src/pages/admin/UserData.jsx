import React, { useMemo } from "react";
import SidebarModule from "../../modules/admin/SidebarModule";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { users } from "../../data/testdata.json";

function countUser(users) {
  return users.filter((user) => users.active).length;
}

function UserData() {
  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Avertar",
        width: 60,
        renderCell: (params) => <Avatar scr={params.row.photoURL} />,
        sortable: false,
        filter: false,
      },
      { field: "name", headerName: "Name", width: 170 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "state", headerName: "State", width: 100 },
    ],
    []
  );

  // const count = useMemo(() => countUser(users) , [users]);

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
          <Typography>Manage Users</Typography>
          <DataGrid columns={columns} rows="3" getRowId={(rows) => rows._id} />
        </Box>
      </Box>
    </SidebarModule>
  );
}

export default UserData;
