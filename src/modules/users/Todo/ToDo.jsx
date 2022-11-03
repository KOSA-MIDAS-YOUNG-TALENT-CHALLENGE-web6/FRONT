import React, { useEffect } from "react";
import { styled } from "@mui/system";
import {
  Card,
  Checkbox,
  TextField,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import customAxios from "../../../lib/customAxios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ToDo() {
  const [todos, setTodos] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const addTodo = async (content) => {
    customAxios.post("/feed", { content });
  };
  const getTodo = async () => {
    const { data } = await customAxios.get("/feed");
    console.log(data);
    setTodos(data.feed_list);
  };
  useEffect(() => {
    getTodo();
  }, []);
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
              { id: props.length, content: e.target.value, done: false },
            ]);
            addTodo(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <FormGroup>
        {todos.map((todo, idx) => (
          <FormControlLabel
            key={todo.id}
            control={
              todo.done ? (
                <Checkbox
                  defaultChecked
                  onClick={() => {
                    console.log("h123");
                  }}
                />
              ) : (
                <Checkbox
                  onClick={() => {
                    // const newTodo = todos.map((currentTodo) => {
                    //   if (todo.id === currentTodo.id) {
                    //     return {
                    //       todo: currentTodo.id,
                    //       content: currentTodo.content,
                    //       done: true,
                    //     };
                    //   }
                    // });
                    // setTodos(newTodo);
                  }}
                />
              )
            }
            label={todo.content}
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
