import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  TextArea,
  Container,
  Header,
  Divider,
} from "semantic-ui-react";
import TodoService from "./rest/todoservice";

export default function App() {
  let todoService = new TodoService("http://127.0.0.1", 8000);
  const [currentTodo, setCurrentTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoService.getTodos().then((response) => setTodos(JSON.parse(response)));
  }, []);

  const inputChange = (event) => {
    setCurrentTodo(event.target.value);
  };
  const submitTodo = (event) => {
    event.preventDefault();
    if (currentTodo !== "") {
      todoService.createTodo(currentTodo);
      setCurrentTodo("");
    }
  };

  return (
    <div>
      <Container>
        <Container>
          <Divider />
          <TextArea
            style={{ minWidth: 1000 }}
            id="todo"
            onChange={(e) => inputChange(e)}
            value={currentTodo}
            placeholder="Keep Note......."
          />
          {/* <textarea
          id="todo"
          onChange={(e) => this.inputChange(e)}
          value={this.state.currentTodo}
        /> */}
          <p />
          <Button onClick={submitTodo} color="teal">
            Create
          </Button>
          {/* <button onClick={this.submitTodo}>Create</button> */}
          <Divider />
        </Container>
        <Header as="h2">My Todos</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell size="9">Content</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {todos.map((todo) => (
              <Table.Row>
                <Table.Cell>{todo.content}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>

      {/* <table>
          <thead>
            <tr>
              <th>complete</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {(this.state.todos || []).map((todo) => (
              <tr>
                <td>{todo.complete}</td>
                <td>{todo.content}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
    </div>
  );
}
