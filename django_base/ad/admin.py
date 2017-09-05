from django.contrib import admin

from .models import Ad


class AdAdmin(admin.ModelAdmin):
    list_display = ('name', 'inner', 'url', 'create_time')
    search_fields = ['name', 'inner__name']
    list_filter = ('inner__name',)

admin.site.register(Ad, AdAdmin)
