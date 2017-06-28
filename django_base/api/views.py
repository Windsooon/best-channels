from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from outer.models import Outer
from outer.serializers import OuterSerializer
from inner.models import Inner
from inner.serializers import InnerSerializer
from playlist.models import Playlist
from playlist.serializers import PlaylistSerializer
from .permissions import IsAdminOrReadOnly


class DefaultsMixin(object):
    permission_classes = (IsAdminOrReadOnly, )
    paginate_by = 20


class OuterViewSet(viewsets.ModelViewSet):
    queryset = Outer.objects.all()
    serializer_class = OuterSerializer


class InnerViewSet(viewsets.ModelViewSet):
    serializer_class = InnerSerializer

    def get_queryset(self):
        queryset = Inner.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(outer__name=category)
        return queryset


class PlaylistViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly, )
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'outer': reverse('outer_list', request=request, format=format),
        'inner': reverse('inner_list', request=request, format=format),
        'playlist': reverse('playlist_list', request=request, format=format)
    })
