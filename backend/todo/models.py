from django.db import models


class Todo(models.Model):
    
    content = models.TextField(default='')

    def __str__(self):
        return "Todo"