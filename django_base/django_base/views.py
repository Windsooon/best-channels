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
            'create_time': channel.create_time,
            'channel_id': channel.channel_id,
        })


def category(request, title):
    return render(
        request, 'small_cate.html',
        {
            'title': title
        }
    )


def sub_category(request, sub):
    return render(
        request, 'sub_category.html',
        {
            'title': sub.replace('-', ' ')
        }
    )
