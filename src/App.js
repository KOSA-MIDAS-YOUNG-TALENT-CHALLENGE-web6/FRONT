import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/users/Home";

function App() {
  return (
    <Routes>
      <Route path="/admin">
        <Route index path="home" element={<Home/>}/>
      </Route>
      <Route path="/users">
        <Route index path="home" element={<Home/>}/>
      </Route>
    </Routes>
  );
}

export default App;
