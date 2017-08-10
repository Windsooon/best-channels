from django.contrib import admin

from .models import Weekly


class WeeklyAdmin(admin.ModelAdmin):
    list_display = ('playlist', 'position', 'create_time',)
    search_fields = ['playlist']

    def get_ordering(self, request):
        return ['playlist.inner']


admin.site.register(Weekly, WeeklyAdmin)
