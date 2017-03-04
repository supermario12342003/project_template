# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from shop.models import Shop

class Product(models.Model):
	name = models.CharField(max_length=100)
	shop = models.ForeignKey(Shop, related_name='shop')
	validated = models.BooleanField(default=False)
	rejected = models.BooleanField(default=False)
	reject_reason = models.TextField(max_length=400, blank=True)

	def shop_name(self):
		return self.shop.name

	def __unicode__(self):
		return unicode(self.name)