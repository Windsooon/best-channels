from django import template
from django.conf import settings
from outer.models import Outer
register = template.Library()


@register.inclusion_tag('nav_categories.html')
def show_categories():
    host = settings.SITE_URL
    categories = Outer.objects.all()
    return {'categories': categories, 'host': host}
