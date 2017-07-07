from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'channel/(?P<title>.+)/$', views.channel, name='channel'),
    url(r'category/(?P<title>.+)/$', views.category, name='category'),
    url(r'subcategory/(?P<sub>.+)/$', views.sub_category, name='sub_category'),
    url(r'^api/', include('api.urls')),
    url(r'^api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^', views.cate),
]
