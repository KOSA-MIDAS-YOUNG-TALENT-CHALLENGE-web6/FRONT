import React from "react";
import { styled } from "@mui/system";
import { Card, Box, Checkbox, TextField, FormGroup, FormControlLabel } from "@mui/material";
import { useState } from "react";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ToDo() {
  const [todo, setTodo] = useState([]);
  return (
    <TodoCard>
      <TextField
        sx={{ width: 300 }}
        id="standard-basic"
        label="Todo"
        variant="standard"
        onChange={(e) => {
          if (e.keyCode === 13) {
            setTodo((props) => [
              ...props,
              { id: props.length, todo: e.target.value, status: "yet" },
            ]);
          }
        }}
      />
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
      </FormGroup>
    </TodoCard>
  );
}

const TodoCard = styled(Card)(({ theme }) => ({
  width: 600,
  height: 400,
  display: "flex",
  boxSizing: "border-box",
  justifyContent: "center",
  color: "darkslategray",
  padding: "20px 30px 40px 30px",
  backgroundColor: "aliceblue",
  borderRadius: 4,
  "&>.info": { display: "flex", justifyContent: "space-around" },
}));