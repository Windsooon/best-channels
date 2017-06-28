from django.shortcuts import render, get_object_or_404
from playlist.models import Playlist


def cate(request):
    return render(request, 'cate.html')


def channel(request, title):
    channel = get_object_or_404(Playlist, channel_title=title)
    return render(
        request, 'channel.html',
        {
            'title': channel.channel_title,
            'description': channel.description,
            'thumbnails': channel.thumbnails,
            'last_update_time': channel.last_update_time,
            'create_time': channel.create_time,
            'subscriber': channel.subscriber,
            'channel_id': channel.channel_id,
        })
