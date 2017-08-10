from django.db import models
from playlist.models import Playlist


class Weekly(models.Model):
    playlist = models.ForeignKey(
        Playlist, related_name="weekly", on_delete=models.CASCADE)
    position = models.IntegerField(default=0)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.playlist.channel_title
