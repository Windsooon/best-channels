from django.db import models


class SubEmail(models.Model):
    email = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=200)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
