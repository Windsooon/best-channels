from rest_framework import serializers
from .models import Weekly


class WeeklySerializer(serializers.ModelSerializer):
    channel_id = serializers.ReadOnlyField(source='playlist.channel_id')

    class Meta:
        model = Weekly
        fields = (
            'channel_id', 'position', 'create_time'
        )
