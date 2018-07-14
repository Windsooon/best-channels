from django import template
from django.conf import settings
from outer.models import Outer
register = template.Library()


@register.inclusion_tag('all_categories.html')
def all_categories():
    host = settings.SITE_URL
    categories = Outer.objects.all()
    return {'categories': categories, 'host': host}
