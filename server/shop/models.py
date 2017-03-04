# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from account.models import Account


class ShopCategory(models.Model):
	name = models.CharField(max_length=100)

	def __unicode__(self):
		return unicode(self.name)

class Shop(models.Model):
	name = models.CharField(max_length=100)
	category = models.ForeignKey(ShopCategory)
	seller = models.ForeignKey(Account, related_name='seller')
	address = models.CharField(max_length=200)
	lng = models.DecimalField(max_digits=16, decimal_places=12)
	lat = models.DecimalField(max_digits=16, decimal_places=12)
	validated = models.BooleanField(default=False)
	rejected = models.BooleanField(default=False)
	reject_reason = models.TextField(max_length=400, blank=True)

	def category_name(self):
		return self.category.name

	def __unicode__(self):
		return unicode(self.name)