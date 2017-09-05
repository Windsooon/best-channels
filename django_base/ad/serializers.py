from .models import Ad
from rest_framework import serializers


class AdSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ad
        fields = (
            'id', 'inner', 'name', 'thumbnail',
            'url', 'position', 'create_time'
        )
