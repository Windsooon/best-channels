from django.db import models
from inner.models import Inner


class Answered(models.Model):
    inner = models.ForeignKey(
        Inner, related_name="answered", on_delete=models.CASCADE)
    quora = models.SmallIntegerField(default=0)
    blog = models.SmallIntegerField(default=0)
    forums = models.SmallIntegerField(default=0)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.inner.name
