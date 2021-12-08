# Todo-App-TDD

Test-driven development (TDD) is a software development process relying on software requirements being converted to test cases before software is fully developed, and tracking all software development by repeatedly testing the software against all test cases. This is as opposed to software being developed first and test cases created later. [Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development).


### General Structure of the Project

| Technologies | Description |
| --- | --- |
| Django |  Backend Design |
| React | Frontend Desing |
| Nginx | Server  |
| Docker | Containerization |

### Libraries Used for Testing

| Technologies | Libraries |
| --- | --- |
| Django |  I used the TestCase library, which is django's own library. |
| React | Jest, Pact, Taiko, Enzyme |



### Examples From Tests

1. #### Django - Backend
  The test is written first. so we get error.
  ```
  from django.test import TestCase
  from .models import Todo

  class TestTodoModel(TestCase):
      def test_creat_todo(self):
          todo = Todo(content="Yeni todo")
          todo.save()
          self.assertEqual(todo.content,"Yeni todo")
  ```
  then we write the code that will pass the test.
  
  ```
  from django.db import models

  class Todo(models.Model):

      content = models.TextField(default='Todo',null=True, blank=True)
      def __str__(self):
          return "Todo"
  ```
  
  we are testing the creation of a new todo
  ```
      def test_create(self):
        create = self.client.post("/create", {"content": "Yeni todo"})
        todo = get_object_or_404(Todo, pk=1)
        self.assertEqual(todo.content, "Yeni todo")
  ```
  
2. #### React - Frontend

  Testing sending textarea value
  ```
  test("submit button onClick event test", () => {
    wrapper
      .find("TextArea")
      .simulate("change", { target: { value: "Yeni todo" } });

    expect(wrapper.state("currentTodo")).toEqual("Yeni todo");
  });
  ```
  
  transferring the sent text to the list
  ```
   test("todo table list test", () => {
    wrapper
      .find("TextArea")
      .simulate("change", { target: { value: "Yeni todo" } });

    const table = wrapper.find('Table');
    //Sayfamızda bir tablo olmasını bekliyoruz
    expect(table).toHaveLength(1);

    const tbody = table.find('Body');

    const row = tbody.find('Row');

    row.forEach((tr) => {
      const cells = tr.find('Cell');
      expect(cells.at(0).text()).toEqual('Yeni todo');
    });
  ```
  