from rest_framework import serializers
from .models import Playlist


class PlaylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
        fields = (
            'id', 'inner', 'channel_id', 'channel_title',
            'description', 'thumbnails', 'subscriber',
            'last_update_time', 'create_time'
        )  
