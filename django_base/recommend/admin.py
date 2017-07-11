from django.contrib import admin

from .models import Recommend


class RecommendAdmin(admin.ModelAdmin):
    list_display = (
        'email', 'category', 'reason', 'create_time',)
    list_filter = ('category',)
    search_fields = ['email', 'category']

admin.site.register(Recommend, RecommendAdmin)
