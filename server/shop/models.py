# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.mail import send_mail
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.core.validators import RegexValidator

class Shop(models.Model):
	name = models.CharField(max_length=100)
	Category = models.ForeignKey(Line)
	directions = models.CharField(max_length=5000)
	company = models.ForeignKey(Company)

	seller = models.ManyToOneField(Account, related_name='stops')

	objects = models.Manager()
	full_objects = StopManager()

	def __unicode__(self):
		return unicode(self.name)

	def get_directions(self):
		try:
			return json.loads(self.directions)
		except:
			return []