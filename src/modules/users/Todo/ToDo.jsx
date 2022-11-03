import React from "react";
import { styled } from "@mui/system";
import {
  Card,
  Box,
  Checkbox,
  TextField,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ToDo() {
  const [todos, setTodos] = useState([]);
  return (
    <TodoCard>
      <TextField
        sx={{ width: 300 }}
        id="standard-basic"
        label="Todo"
        variant="standard"
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
            control={todo.done ? <Checkbox defaultChecked /> : <Checkbox />}
            label={todo.title}
          />
        ))}
      </FormGroup>
    </TodoCard>
  );
}

const TodoCard = styled(Card)(({ theme }) => ({
  width: 600,
  height: 400,
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  alignItems: "center",
  color: "darkslategray",
  padding: "20px 30px 40px 30px",
  backgroundColor: "aliceblue",
  borderRadius: 4,
}));
