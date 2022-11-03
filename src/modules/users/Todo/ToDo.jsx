import React, { useEffect } from "react";
import { styled } from "@mui/system";
import {
  Card,
  Checkbox,
  TextField,
  FormGroup,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useState } from "react";
import customAxios from "../../../lib/customAxios";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const deleteTodo = async (todoId) => {
    customAxios.delete(`/feed${todoId}`);
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
          <Box>
            <FormControlLabel
              key={todo.id}
              control={
                todo.done ? (
                  <Box>
                    <Checkbox defaultChecked onClick={() => {}} />
                  </Box>
                ) : (
                  <Box>
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
                  </Box>
                )
              }
              label={todo.content}
            />
            <DeleteIcon
              onClick={() => {
                const newTodos = todos.filter((checkTodo) => {
                  if (checkTodo.id !== todo.id) {
                    deleteTodo(todo.id);
                  }
                  return checkTodo.id !== todo.id;
                });
                setTodos(newTodos);
              }}
            />
          </Box>
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
  [theme.breakpoints.down("sm")]: {
    width: "90vw",
    margin: "0px 10px 20px 10px",
  },
}));
