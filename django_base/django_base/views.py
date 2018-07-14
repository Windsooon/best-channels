from django.shortcuts import render, get_object_or_404
from django.conf import settings
from playlist.models import Playlist
from inner.models import Inner


def cate(request):
    return render(request, 'cate.html')


def why(request):
    return render(request, 'why.html')


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
    inner_object = Inner.objects.filter(outer__name=title)
    host = settings.SITE_URL
    if inner_object.count() == 0:
        return render(request, '404.html')
    return render(
        request, 'num_cate.html',
        {
            'title': title,
            'inner_set': inner_object,
            'host': host,
        }
    )


def sub_category(request, sub):
    return render(
        request, 'sub_category.html',
        {
            'title': sub.replace('-', ' ')
        }
    )


def videos(request, title):
    return render(
        request, 'videos.html',
        {
            'title': title.replace('-', ' ')
        }
    )
