# Generated by Django 3.2.9 on 2021-12-08 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_alter_todo_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='content',
            field=models.TextField(blank=True, default='Todo', null=True),
        ),
    ]
