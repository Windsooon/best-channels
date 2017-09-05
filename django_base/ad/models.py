from django.db import models
from inner.models import Inner


class Ad(models.Model):
    inner = models.ForeignKey(
        Inner, related_name="ad", on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    thumbnail = models.CharField(max_length=255, unique=True)
    url = models.URLField(unique=True)
    position = models.SmallIntegerField(default=0)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
