# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-04 19:18
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_auto_20170303_1532'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shop',
            old_name='gps_lat',
            new_name='lat',
        ),
        migrations.RenameField(
            model_name='shop',
            old_name='gps_long',
            new_name='lng',
        ),
    ]
