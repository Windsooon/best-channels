from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

outer_list = views.OuterViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

outer_detail = views.OuterViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

inner_list = views.InnerViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

inner_detail = views.InnerViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

playlist_list = views.PlaylistViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

playlist_detail = views.PlaylistViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

recommend_list = views.RecommendViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

recommend_detail = views.RecommendViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

sub_list = views.SubViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

sub_detail = views.SubViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = format_suffix_patterns([
    url(r'sub/$', sub_list, name='sub_list'),
    url(r'sub/(?P<pk>[0-9]+)/$',
        sub_detail, name='sub_detail'),
    url(r'recommend/$', recommend_list, name='recommend_list'),
    url(r'recommend/(?P<pk>[0-9]+)/$',
        recommend_detail, name='recommend_detail'),
    url(r'outer/$', outer_list, name='outer_list'),
    url(r'outer/(?P<pk>[0-9]+)/$', outer_detail, name='outer_detail'),
    url(r'inner/$', inner_list, name='inner_list'),
    url(r'inner/(?P<pk>[0-9]+)/$', inner_detail, name='inner_detail'),
    url(r'playlist/$', playlist_list, name='playlist_list'),
    url(r'playlist/(?P<pk>[0-9]+)/$', playlist_detail, name='playlist_detail'),
    url(r'$', views.api_root),
])
