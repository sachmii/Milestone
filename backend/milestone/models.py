from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        author = self.author if self.author else "Unknown Author"
        title = self.title if self.title else "Untitled"
        return f"{title} by {author}"