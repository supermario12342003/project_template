# -*- coding: utf-8 -*-
# @Author: Mengwei Choong
# @Date:   2017-02-10 12:55:07
# @Last Modified by:   Mengwei Choong
# @Last Modified time: 2017-02-12 16:20:40
from account import views
from django.conf.urls import url
from rest_framework import routers

#API url
router = routers.DefaultRouter()
router.register(r'account', views.AccountViewSet)