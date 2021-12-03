import Todo from "../model/Todo"
import adapter from 'axios/lib/adapters/http';
const axios = require('axios');

class TodoService {

    constructor(baseUrl, port) {
        this.baseUrl = baseUrl;
        this.port = port;
    }

    getTodos() {
        return axios.request({
            method: 'GET',
            url: "/",
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8'
            }
        }, adapter).then((response) => {
            const todo = response.data;
            return new Promise((resolve, reject) => {
                try {
                    this._validateIncomingTodo(todo);
                    resolve(todo);
                } catch (error) {
                    reject(error);
                }
            });
        });
    };

    createTodo(todo) {
        this._validateTodoForCreation(todo);
        return axios.request({
            method: 'POST',
            url: "/create",
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: todo
        }, adapter).then((response) => {
            const todo = response.data;
            return new Promise((resolve, reject) => {
                try {
                    this._validateIncomingTodo(todo);
                    resolve(todo);
                } catch (error) {
                    reject(error);
                }
            });
        });
    };

    _validateIncomingTodo(todo) {
        Todo.validateId(todo);
        Todo.validateContent(todo);
    }

    _validateTodoForCreation(todo) {
        delete todo.id;
        Todo.validateContent(todo);
    }

}

export default TodoService;

