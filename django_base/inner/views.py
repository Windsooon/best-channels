from django import template
register = template.Library()


@register.inclusion_tag('nav_category.html')
def show_categories(outer):
    return [1, 2, 100]
