from django.contrib import admin

from .models import Playlist


class PlaylistAdmin(admin.ModelAdmin):
    list_display = (
        'channel_title', 'channel_id', 'inner', 'id', 'create_time',)
    search_fields = ['channel_title', 'inner__name']

admin.site.register(Playlist, PlaylistAdmin)
