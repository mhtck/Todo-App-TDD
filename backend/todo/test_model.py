from django.test import TestCase

from .models import Todo


class TestTodoModel(TestCase):

    #Todo diye bir module olmadığı hatasını alıyoruz
    #Modulu oluşturup tekrar test edelim
    def test_creat_todo(self):
        todo = Todo(content="Yeni todo")
        todo.save()
        self.assertEqual(todo.content,"Yeni todo")
