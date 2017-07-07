from django.db import models
from inner.models import Inner


class GroupSlider(models.Model):
    inner = models.ForeignKey(
        Inner, related_name="group_slider", on_delete=models.CASCADE)
    title = models.CharField(max_length=64, blank=True)
    content = models.CharField(max_length=256, blank=True)
    thumbnail = models.CharField(max_length=256, blank=True)
    url = models.CharField(max_length=256, blank=True)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
