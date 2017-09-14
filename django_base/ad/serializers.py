from .models import Ad
from rest_framework import serializers


class AdSerializer(serializers.ModelSerializer):
    inner_name = serializers.ReadOnlyField(source='inner.name')

    class Meta:
        model = Ad
        fields = (
            'id', 'name', 'inner_name', 'thumbnail',
            'url', 'position', 'create_time'
        )
