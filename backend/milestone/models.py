from django.db import models

# Create your models here.

class Task(models.Model):
    author = models.CharField(max_length=30)
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        author = self.author if self.author else "Unknown Author"
        title = self.title if self.title else "Untitled"
        return f"{title} by {author}"

    