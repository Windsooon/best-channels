import requests
from requests.auth import HTTPBasicAuth
from collections import namedtuple


class Channel:

    def __init__(
            self, channel_id=None,
            user_name=None, max_results=6, type=None):

        self.base_url = 'https://www.googleapis.com/youtube/v3/'
        self.user_name = user_name
        self.type = type
        self.max_results = max_results
        self.key = 'AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY'
        if channel_id and not user_name:
            self.channel_id = channel_id
        else:
            self.channel_id = self._username_to_channalid(self.user_name)
        self.channel_info = self.base_url + 'channels?part=snippet&id=' + \
            self.channel_id + '&key=' + self.key

    @staticmethod
    def object_hook(d):
        return namedtuple('X', d.keys())(*d.values())

    def _username_to_channalid(self, user_id):
        url = self.base_url + 'channels?key=' + self.key + \
            '&forUsername=' + self.user_name + '&part=id'
        return self._requests_api(url)['items'][0]['id']

    def _requests_api(self, url, format='json'):
        if format == 'json':
            return requests.get(url).json()
        else:
            return requests.get(url)

    def get_channel_info(self):
        channel_json = self._requests_api(self.channel_info)
        channel = self.object_hook(channel_json)
        datas = {
            'inner': self._base_dict(self.type),
            'channel_id': self.channel_id,
            'channel_title': channel.items[0]['snippet']['title'],
            'description': (
                channel.items[0]['snippet']
                ['localized']['description']
            ),
            'thumbnails': (
                channel.items[0]['snippet']
                ['thumbnails']['high']['url']
                .rsplit('/', 1)[0] + '/'),
            'subscriber': self._get_subscriber(),
            'create_time': channel.items[0]['snippet']['publishedAt'],
            'last_update_time': self._get_video_info()
        }
        return datas

    def _get_subscriber(self):
        url = (
            self.base_url + 'channels?key=' + self.key +
            '&part=statistics' + '&id=' + self.channel_id)
        return (self._requests_api(url)['items'][0]
                ['statistics']['subscriberCount'])

    def _get_video_info(self):
        self.video_info = (
            self.base_url + 'search?part=snippet&type=video&order=date&' +
            'maxResults=' + str(self.max_results) + '&channelId=' +
            self.channel_id + '&key=' + self.key
        )
        video_json = self._requests_api(self.video_info)
        video = self.object_hook(video_json)
        return video.items[0]['snippet']['publishedAt']

    def add_channel(self, datas):
        headers = {'Content-type': 'application/json'}
        local_url = 'http://127.0.0.1/api/playlist/'
        r = requests.post(
            url=local_url, json=datas, headers=headers,
            auth=HTTPBasicAuth('windson', 'ilovetime1')
        )
        return r.text

    def _base_dict(self, type):
        dict = {
            'Biology': 7,
            'Computer': 8,
            'Math': 9,
            'Physics': 10,
        }
        if type in dict:
            return dict[type]
        raise ValueError('This type doesn\'t exist.')


first = Channel('UCYO_jab_esuFRV4b17AJtAw', type='Math')
d = first.get_channel_info()
first.add_channel(d)
