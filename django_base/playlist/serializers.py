import requests
from rest_framework import serializers
from django_base.settings import DEBUG
from .models import Playlist


class PlaylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
        fields = (
            'id', 'inner', 'channel_id', 'channel_title', 'email', 'type',
            'update_time', 'create_time'
        )

    def validate_channel_id(self, data):
        url = 'https://www.youtube.com/channel/' + data
        if not DEBUG:
            response = requests.get(url=url)
            if response.status_code != 200:
                raise serializers.ValidationError("20001")
        return data
