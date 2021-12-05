from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from .models import Todo
from .forms import TodoForm
from django.http import JsonResponse

# Create your views here.

def getAll( request):
    query = Todo.objects.all()
    return JsonResponse([ content.content for content in query], safe=False)

def create( request):
    if request.method == "POST":
        form = TodoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/")
        