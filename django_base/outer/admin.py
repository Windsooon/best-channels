from django.contrib import admin

from .models import Outer


class OuterAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'create_time',)
    search_fields = ['name']

admin.site.register(Outer, OuterAdmin)
