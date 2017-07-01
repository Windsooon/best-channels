from django.contrib import admin

from .models import Inner


class InnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'outer', 'id', 'create_time',)
    search_fields = ['name', 'outer__name']

admin.site.register(Inner, InnerAdmin)
