from django.db import models


class Outer(models.Model):
    name = models.CharField(max_length=50, unique=True)
    thumbnail = models.CharField(max_length=255, blank=True)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
