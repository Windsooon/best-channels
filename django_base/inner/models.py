from django.db import models
from outer.models import Outer


class Inner(models.Model):
    outer = models.ForeignKey(
        Outer, related_name="inner", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
