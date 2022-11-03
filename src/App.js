import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import Home from "./pages/users/Home";
import "./App.css";
import Dashboard from "./pages/admin/Dashboard";
import UserData from "./pages/admin/UserData";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin">
          <Route index path="dashboard" element={<Dashboard/>}/>
          <Route index path="userdata" element={<UserData/>}/>
        </Route>
        <Route path="/">
          <Route index path="home" element={<Home />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
