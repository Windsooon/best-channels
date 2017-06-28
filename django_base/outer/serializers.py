from .models import Outer
from rest_framework import serializers


class OuterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Outer
        fields = ('id', 'name', 'thumbnail')
