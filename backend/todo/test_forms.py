from django.test import TestCase
from .forms import TodoForm

class TestTodoForm(TestCase):

    def test_create_todo_validation(self):
        form = TodoForm({'content' : 'Keep todo'})
        self.assertTrue(form.is_valid())