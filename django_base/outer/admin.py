from django.contrib import admin

from .models import Outer


class OuterAdmin(admin.ModelAdmin):
    list_display = ('name', 'create_time',)

admin.site.register(Outer, OuterAdmin)
