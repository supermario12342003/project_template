# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-26 15:24
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0008_auto_20170226_1523'),
    ]

    operations = [
        migrations.AlterField(
            model_name='baseuser',
            name='phone',
            field=models.CharField(blank=True, max_length=20, null=True, unique=True, validators=[django.core.validators.RegexValidator(message=b"Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex=b'^\\+?1?\\d{9,15}$')]),
        ),
    ]