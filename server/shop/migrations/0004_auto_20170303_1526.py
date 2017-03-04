# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-03 15:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_shop_validated'),
    ]

    operations = [
        migrations.AddField(
            model_name='shop',
            name='reject_reason',
            field=models.CharField(blank=True, max_length=400),
        ),
        migrations.AddField(
            model_name='shop',
            name='rejected',
            field=models.BooleanField(default=False),
        ),
    ]