from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from .models import Todo
from .forms import TodoForm
from django.http import JsonResponse


# Create your views here.


def getAll(request):
    query = Todo.objects.all()
    return JsonResponse([{"id": int(content.id), "content": content.content} for content in query], safe=False)


def create(request):
    ct = request.GET.get('content')
    print(ct)

    Todo.objects.create(content=ct)
    todo = Todo.objects.all().order_by("-id")[0]
    return JsonResponse([{"id": todo.id, "content": todo.content}], safe=False)
