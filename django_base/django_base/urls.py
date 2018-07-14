from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^here_is_normal_admin/', admin.site.urls),
    url(r'^why/$', views.why),
    url(r'channel/(?P<title>.+)/$',
        views.channel, name='channel'),
    url(r'subcategory/(?P<sub>.+)/$',
        views.sub_category, name='sub_category'),
    url(r'videos/(?P<title>.+)/$',
        views.videos, name='videos'),
    url(r'category/(?P<title>.+)/$',
        views.category, name='category'),
    url(r'^api/', include('api.urls')),
    url(r'^api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^', views.cate),
]
