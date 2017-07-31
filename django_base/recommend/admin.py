from django.contrib import admin

from .models import Recommend


class RecommendAdmin(admin.ModelAdmin):
    list_display = (
        'checked', 'email', 'category', 'reason', 'create_time',)
    list_filter = ('checked',)
    search_fields = ['email', 'category']

admin.site.register(Recommend, RecommendAdmin)
