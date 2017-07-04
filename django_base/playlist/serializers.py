from rest_framework import serializers
from .models import Playlist


class PlaylistSerializer(serializers.ModelSerializer):
    inner = serializers.ReadOnlyField(source='inner.name')

    class Meta:
        model = Playlist
        fields = (
            'id', 'inner', 'channel_id', 'channel_title',
            'update_time', 'create_time'
        )
