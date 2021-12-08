import Todo from "../model/Todo"
import adapter from 'axios/lib/adapters/http';
//const axios = require('axios');
import axiosOriginal from 'axios'

const axios = axiosOriginal.create({ adapter })



class TodoService {

    constructor() {
        this.baseUrl = "http://127.0.0.1";
        this.port = "8000";
    }

    getByProductName(){
        return axios.get(`${this.baseUrl}:${this.port}`);
    }

    getTodos() {
        return axios.request({
            method: 'GET',
            url: "/",
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8'
            }
        }, adapter).then(function(response)  {
           return JSON.stringify((response.data))
        });
    };

    createTodo(newTodo) {
        return axios({
            method: 'post',
            url: `/create?content=${newTodo}`,
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            }
        }, adapter).then(function(response)  {
            console.log("response " +response.data)
            let todo = JSON.stringify((response.data))
            todo = JSON.parse(todo)
            let td = new Todo()
            td.id = todo[0].id
            td.content = todo[0].content
            console.log("toooooooo" + todo[0].content)
            return new Promise((resolve, reject) => {
                try {
                    console.log(" validete :" + td.content)
                   // this._validateIncomingTodo(td);
                    resolve(td);
                } catch (error) {
                    reject(error);
                }
            });
        });
    };


    _validateIncomingTodo(t) {
        Todo.validateId(t);
        Todo.validateContent(t);
    }

    _validateTodoForCreation(t) {
        delete t.id;
        Todo.validateContent(t);
    }

}

export default TodoService;

