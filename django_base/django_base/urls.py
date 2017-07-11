from django.conf.urls import url, include
from django.contrib import admin
from django.views.decorators.cache import cache_page
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^why/$', views.why),
    url(r'channel/(?P<title>.+)/$',
        cache_page(60 * 200)(views.channel), name='channel'),
    url(r'subcategory/(?P<sub>.+)/$',
        cache_page(60 * 200)(views.sub_category), name='sub_category'),
    url(r'category/(?P<title>.+)/$',
        cache_page(60 * 200)(views.category), name='category'),
    url(r'^api/', include('api.urls')),
    url(r'^api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^', cache_page(60 * 200)(views.cate)),
]
