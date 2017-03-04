# -*- coding: utf-8 -*-
# @Author: Mengwei Choong
# @Date:   2017-02-10 12:55:07
# @Last Modified by:   Mengwei Choong
# @Last Modified time: 2017-03-03 15:47:25
from shop import views
from django.conf.urls import url
from rest_framework import routers

#API url
router = routers.DefaultRouter()
router.register(r'shops', views.ShopViewSet)