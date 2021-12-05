import TodoService from "./todoservice";
import * as Pact from "@pact-foundation/pact";
import Todo from "../model/Todo";

jest.useRealTimers();

describe("TodoService API", () => {
  const todoService = new TodoService("http://localhost", global.port);

  const contentTypeJsonMatcher = Pact.Matchers.term({
    matcher: "application\\/json; *charset=utf-8",
    generate: "application/json; charset=utf-8",
  });

  describe("getTodos()", () => {
    beforeEach((done) => {
      global.provider
        .addInteraction({
          state: "a todo exists",
          uponReceiving: "a GET request for a todo",
          withRequest: {
            method: "GET",
            path: "/",
            headers: {
              Accept: contentTypeJsonMatcher,
            },
          },
          willRespondWith: {
            status: 200,
            headers: {
              "Content-Type": contentTypeJsonMatcher,
            },
            body: Pact.Matchers.somethingLike(
              new Todo("Todo 111", 1),
              new Todo("Todo 222", 2)
            ),
          },
        })
        .then(() => done());
    });

    it("sends a request according to contract", (done) => {
      
      todoService
        .getTodos()
        .then((todos) => {
          expect(todos).toEqual(new Todo("Todo 111", 1),
          new Todo("Todo 222", 2));
        })
        .then(() => {
          global.provider.verify().then(
            () => done(),
            (error) => {
              done.fail(error);
            }
          );
        });
    });
  });

  describe("createTodo()", () => {
    beforeEach((done) => {
      jest.setTimeout(60000);
      global.provider
        .addInteraction({
          state: "provider allows todo creation",
          uponReceiving: "a POST request to create a todo",
          withRequest: {
            method: "POST",
            path: "/create",
            headers: {
              Accept: contentTypeJsonMatcher,
              "Content-Type": contentTypeJsonMatcher,
            },
            body: new Todo("Todo 222"),
          },
          willRespondWith: {
            status: 201,
            headers: {
              "Content-Type": Pact.Matchers.term({
                matcher: "application\\/json; *charset=utf-8",
                generate: "application/json; charset=utf-8",
              }),
            },
            body: Pact.Matchers.somethingLike(new Todo("Todo 222", 2)),
          },
        })
        .then(() => done());
    });

    it("sends a request according to contract", (done) => {
      jest.setTimeout(10 * 1000); 
      todoService
        .createTodo(new Todo("Todo 222"))
        .then( todo => {
          expect(todo.id).toEqual(2);
        })
        .then(() => {
          global.provider.verify().then(
            () => done(),
            (error) => {
              done.fail(error);
            }
          );
        });
    });
  });
});
