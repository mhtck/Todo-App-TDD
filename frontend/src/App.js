import "./App.css";
import React, { Component } from "react";
import {
  Table,
  Icon,
  Button,
  TextArea,
  Container,
  Header,
  Divider,
} from "semantic-ui-react";

export default class App extends Component {
  state = {
    todos: [],
    currentTodo: "",
  };

  inputChange = (event) => {
    this.setState({
      currentTodo: event.target.value,
    });
  };

  submitTodo = (event) => {
    event.preventDefault();
    if (this.state.currentTodo !== "") {
      const newTodo = {
        content: this.state.currentTodo,
        complete: false,
      };
      this.setState({
        todos: [...this.state.todos, newTodo],
        currentTodo: "",
      });
    }
  };
  render() {
    return (
      <div>
        <Container>
          <Container>
            <Divider />
            <TextArea
              style={{ minWidth: 1000 }}
              id="todo"
              onChange={(e) => this.inputChange(e)}
              value={this.state.currentTodo}
              placeholder="Keep Note......."
            />
            {/* <textarea
          id="todo"
          onChange={(e) => this.inputChange(e)}
          value={this.state.currentTodo}
        /> */}
            <p />
            <Button onClick={this.submitTodo} color="teal">
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
                <Table.HeaderCell size="3">Completed</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {(this.state.todos || []).map((todos) => (
                <Table.Row>
                  <Table.Cell>{todos.content}</Table.Cell>
                  <Table.Cell collapsing>
                    <Table.Cell textAlign="center">
                      {todos.completed ? (
                        <Icon color="green" name="checkmark" size="large" />
                      ) : (
                        <Icon color="red" name="checkmark" size="large" />
                      )}
                    </Table.Cell>
                  </Table.Cell>
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
}
