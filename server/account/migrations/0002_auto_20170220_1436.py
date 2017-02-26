# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-20 14:36
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='baseuser',
            name='Address',
            field=models.CharField(blank=True, max_length=140, verbose_name='address'),
        ),
        migrations.AddField(
            model_name='baseuser',
            name='phone_number',
            field=models.CharField(default=b'+330612345678', max_length=20, validators=[django.core.validators.RegexValidator(message=b"Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex=b'^\\+?1?\\d{9,15}$')]),
        ),
    ]
