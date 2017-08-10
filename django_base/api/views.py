import requests
from requests.auth import HTTPBasicAuth
from django.db.models import Count
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
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
from recommend.models import Recommend
from recommend.serializers import RecommendSerializer
from .permissions import IsAdminOrReadOnly, IsAdminOrCreate


class DefaultsMixin(object):
    permission_classes = (IsAdminOrReadOnly, )
    paginate_by = 1


class OuterViewSet(DefaultsMixin, viewsets.ModelViewSet):
    queryset = Outer.objects.all()
    serializer_class = OuterSerializer

    def get_queryset(self):
        queryset = Outer.objects.all().annotate(
            num_inner=Count('inner__playlist')).order_by('-num_inner')
        return queryset


class InnerViewSet(DefaultsMixin, viewsets.ModelViewSet):
    serializer_class = InnerSerializer

    def get_queryset(self):
        queryset = Inner.objects.all().annotate(
            num_channel=Count('playlist')).order_by('-num_channel')

        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(outer__name=category)

        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name=name)

        related = self.request.query_params.get('related', None)
        if related is not None:
            queryset = queryset.filter(name=related)
            if queryset:
                queryset = Inner.objects.filter(
                        outer=queryset[0].outer)
            else:
                return Inner.objects.filter(outer_id=1)
        return queryset


class PlaylistViewSet(DefaultsMixin, viewsets.ModelViewSet):
    queryset = Playlist.objects.all().order_by('-update_time')
    serializer_class = PlaylistSerializer


class RecommendViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrCreate, )
    queryset = Recommend.objects.all()
    serializer_class = RecommendSerializer


@csrf_exempt
def sub_list(request):
    email = request.POST.get("email", None)
    category = request.POST.get("category", None)
    auth = HTTPBasicAuth('Windson', '531214a4d6a1ae9d1148c6bbf5485221-us16')
    headers = {'content-type': 'application/json'}

    # create a group
    group_url = 'https://us16.api.mailchimp.com' + \
        '/3.0/lists/b70ba3fa75/interest-categories/7f004df895/interests'
    group_data = {
        'name': category,
    }
    requests.post(
        url=group_url, auth=auth,
        headers=headers, json=group_data)

    # get group interest from name
    interest_url = (
        'https://us16.api.mailchimp.com/3.0/lists/' +
        'b70ba3fa75/interest-categories/7f004df895/interests')
    interest_res = requests.get(url=interest_url, auth=auth, headers=headers)
    for ins in interest_res.json()['interests']:
        if ins['name'] == category:
            id = ins['id']

    # add a member to list
    member_url = 'https://us16.api.mailchimp.com/3.0/lists/b70ba3fa75/members'
    member_data = {
        'email_address': email,
        'status': 'subscribed',
        'interests': {id: True}
    }
    member_res = requests.post(
        url=member_url, auth=auth, headers=headers, json=member_data)
    return HttpResponse(member_res.content, status=member_res.status_code)


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'outer': reverse('outer_list', request=request, format=format),
        'inner': reverse('inner_list', request=request, format=format),
        'playlist': reverse('playlist_list', request=request, format=format),
        'recommend': reverse('recommend_list', request=request, format=format),
    })
