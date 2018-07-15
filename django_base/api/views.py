import requests
from datetime import datetime, timedelta
from requests.auth import HTTPBasicAuth
from django.db.models import Count
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from outer.models import Outer
from outer.serializers import OuterSerializer
from inner.models import Inner
from inner.serializers import InnerSerializer
from playlist.models import Playlist
from playlist.serializers import PlaylistSerializer
from weekly_channels.models import Weekly
from weekly_channels.serializers import WeeklySerializer
from recommend.models import Recommend
from recommend.serializers import RecommendSerializer
from ad.models import Ad
from ad.serializers import AdSerializer
from .permissions import IsAdminOrReadOnly, IsAdminOrCreate


class OuterViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly, )
    queryset = Outer.objects.all()
    serializer_class = OuterSerializer

    def get_queryset(self):
        queryset = Outer.objects.all().annotate(
            num_inner=Count('inner__playlist')).order_by('-num_inner')
        return queryset


class InnerViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly, )
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


class PlaylistViewSet(viewsets.ModelViewSet):
    serializer_class = PlaylistSerializer

    def create(self, request, *args, **kwargs):
        channel_id = request.data['channel_id']
        try:
            Playlist.objects.get(channel_id=channel_id)
        except ObjectDoesNotExist:
            response = requests.get(
                'https://www.youtube.com/channel/' + channel_id)
            if response.status_code == 404:
                return Response(status=404)
            else:
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                return Response(
                    serializer.data, status=status.HTTP_201_CREATED,
                    headers=headers)
        else:
            return Response(status=401)

    def get_queryset(self):
        queryset = Playlist.objects.all().order_by('-update_time')
        related = self.request.query_params.get('newest', None)
        if related is not None:
            queryset = queryset.filter(
                create_time__gte=datetime.now()-timedelta(days=30)). \
                    order_by('-create_time')[:10]
        return queryset


class RecommendViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrCreate, )
    queryset = Recommend.objects.all()
    serializer_class = RecommendSerializer


class WeeklyViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly, )
    queryset = Weekly.objects.all().order_by('-position')
    serializer_class = WeeklySerializer


class AdViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly, )
    queryset = Ad.objects.all().order_by('-position')
    serializer_class = AdSerializer

    def get_queryset(self):
        queryset = Ad.objects.all().order_by('-position')
        inner_name = self.request.query_params.get('inner', None)
        if inner_name is not None:
            queryset = queryset.filter(inner__name=inner_name)
        return queryset


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
        'b70ba3fa75/interest-categories/7f004df895/interests?count=1000')
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
        'weekly': reverse('weekly_list', request=request, format=format),
        'resource': reverse('ad_list', request=request, format=format),
    })
