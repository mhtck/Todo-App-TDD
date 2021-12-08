from django.db import models


class Todo(models.Model):
    
    content = models.TextField(default='Todo',null=True, blank=True)

    def __str__(self):
        return "Todo"