# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-05 02:23
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('inner', '0005_inner_thumbnail'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ad',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('thumbnail', models.CharField(max_length=255, unique=True)),
                ('url', models.URLField(unique=True)),
                ('position', models.SmallIntegerField(default=0)),
                ('create_time', models.DateTimeField(auto_now_add=True)),
                ('update_time', models.DateTimeField(auto_now=True)),
                ('inner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ad', to='inner.Inner')),
            ],
        ),
    ]