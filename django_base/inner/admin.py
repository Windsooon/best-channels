from django.contrib import admin

from .models import Inner


class InnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'outer', 'create_time',)

admin.site.register(Inner, InnerAdmin)
