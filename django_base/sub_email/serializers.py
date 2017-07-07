from rest_framework import serializers
from .models import SubEmail


class SubEmailSerializer(serializers.ModelSerializer):

    class Meta:
        model = SubEmail
        fields = (
            'id', 'email', 'category', 'create_time')
