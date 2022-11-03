import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from "./pages/public/Login";
import Home from "./pages/users/Home";

const theme = createTheme({
  palette: {
     primary: {
       light: '#757ce8',
       main: '#3f50b5',
       dark: '#002884',
       contrastText: '#fff',
     },
     secondary: {
       light: '#ff7961',
       main: '#f44336',
       dark: '#ba000d',
       contrastText: '#000',
     },
   }
 })

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin">
          <Route index path="home" element={<Home/>}/>
        </Route>
        <Route path="/">
          <Route index path="home" element={<Home/>}/>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
