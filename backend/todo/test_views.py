from django.test import TestCase
from django.shortcuts import get_object_or_404
from .models import Todo

class TestViews(TestCase):
    def test_get_all(self):
        page = self.client.get("/")
        self.assertEqual(page.status_code, 200)

    def test_create(self):
        create = self.client.post("/create", {"content": "Yeni todo"})
        todo = get_object_or_404(Todo, pk=1)
        self.assertEqual(todo.content, "Yeni todo")

    

    