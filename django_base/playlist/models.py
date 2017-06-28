from django.db import models
from inner.models import Inner


class Playlist(models.Model):
    inner = models.ForeignKey(
        Inner, related_name="playlist", on_delete=models.CASCADE)
    channel_id = models.CharField(max_length=100, unique=True)
    channel_title = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length=2000)
    thumbnails = models.URLField()
    subscriber = models.IntegerField(blank=True)
    last_update_time = models.DateTimeField(blank=True)
    add_time = models.DateTimeField(auto_now_add=True)
    create_time = models.DateTimeField()
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.channel_title

    class Meta:
        ordering = ['subscriber']
