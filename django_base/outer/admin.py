from django.contrib import admin

from .models import Outer


class OuterAdmin(admin.ModelAdmin):
    def inner_count(self, obj):
        return obj.inner.count()

    list_display = ('name', 'inner_count', 'id', 'create_time',)
    list_filter = ('name',)
    search_fields = ['name']

admin.site.register(Outer, OuterAdmin)
