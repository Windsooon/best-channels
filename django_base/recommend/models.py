from django.db import models


class Recommend(models.Model):
    TYPE_CHOICES = (
       ('N', 'New'),
       ('A', 'Added'),
       ('L', 'Not Good Enough'),
       ('I', 'Ignore'),
       ('O', 'Others'),
     )
    email = models.CharField(max_length=100, unique=True, blank=True)
    category = models.CharField(max_length=200)
    reason = models.CharField(max_length=1000)
    checked = models.CharField(max_length=5, choices=TYPE_CHOICES, default='N')
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
