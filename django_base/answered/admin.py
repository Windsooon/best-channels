from django.contrib import admin

from .models import Answered


class AnsweredAdmin(admin.ModelAdmin):
    list_display = ('inner', 'quora', 'blog', 'forums',)
    search_fields = ['inner__name']
    list_filter = ('inner__name',)

admin.site.register(Answered, AnsweredAdmin)
