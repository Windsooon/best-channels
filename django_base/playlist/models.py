from django.db import models
from inner.models import Inner


class Playlist(models.Model):
    HOT = 'hot'
    NEW = 'new'

    PLAYLIST_TYPE = (
        (HOT, 'hot'),
        (NEW, 'new'),
    )

    inner = models.ForeignKey(
        Inner, related_name="playlist", on_delete=models.CASCADE)
    channel_id = models.CharField(max_length=100, unique=True)
    channel_title = models.CharField(max_length=200, unique=True, blank=True)
    description = models.CharField(max_length=200, blank=True)
    type = models.CharField(
        max_length=10,
        choices=PLAYLIST_TYPE,
        default=HOT)
    email = models.CharField(max_length=100, blank=True)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.channel_title + '  ----  ' + self.inner.name
