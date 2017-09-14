from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

outer_list = views.OuterViewSet.as_view({
    'get': 'list',
})

outer_detail = views.OuterViewSet.as_view({
    'get': 'retrieve',
})

inner_list = views.InnerViewSet.as_view({
    'get': 'list',
})

inner_detail = views.InnerViewSet.as_view({
    'get': 'retrieve',
})

playlist_list = views.PlaylistViewSet.as_view({
    'get': 'list',
})

playlist_detail = views.PlaylistViewSet.as_view({
    'get': 'retrieve',
})

recommend_list = views.RecommendViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

recommend_detail = views.RecommendViewSet.as_view({
    'get': 'retrieve',
})

ad_list = views.AdViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

ad_detail = views.AdViewSet.as_view({
    'get': 'retrieve',
})

weekly_list = views.WeeklyViewSet.as_view({
    'get': 'list',
})


urlpatterns = format_suffix_patterns([
    url(r'sub/$', views.sub_list, name='sub_list'),
    url(r'recommend/$', recommend_list, name='recommend_list'),
    url(r'recommend/(?P<pk>[0-9]+)/$',
        recommend_detail, name='recommend_detail'),
    url(r'outer/$', outer_list, name='outer_list'),
    url(r'outer/(?P<pk>[0-9]+)/$', outer_detail, name='outer_detail'),
    url(r'inner/$', inner_list, name='inner_list'),
    url(r'inner/(?P<pk>[0-9]+)/$', inner_detail, name='inner_detail'),
    url(r'playlist/$',
        playlist_list, name='playlist_list'),
    url(r'playlist/(?P<pk>[0-9]+)/$',
        playlist_detail, name='playlist_detail'),
    url(r'resource/$',
        ad_list, name='ad_list'),
    url(r'resource/(?P<pk>[0-9]+)/$',
        ad_detail, name='ad_detail'),
    url(r'weekly/$',
        weekly_list, name='weekly_list'),
    url(r'$', views.api_root),
])
