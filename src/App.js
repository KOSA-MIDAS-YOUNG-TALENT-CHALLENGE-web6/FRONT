import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/users/Home";
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
        <Route path="/admin">
          <Route index path="home" element={<Home/>}/>
        </Route>
        <Route path="/users">
          <Route index path="home" element={<Home/>}/>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
