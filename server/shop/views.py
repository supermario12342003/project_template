# -*- coding: utf-8 -*-
from shop.models import Shop, ShopCategory
from shop.serializers import ShopSerializer, ShopCreationSerializer
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from shop.permissions import IsShopOwner
from rest_framework.permissions import AllowAny
from rest_framework.decorators import list_route, detail_route
from rest_framework.permissions import IsAuthenticated
import json
import pdb
from django.utils.translation import ugettext as _
from django.conf import settings
from core.utils.email import send_email

class ShopViewSet(viewsets.ModelViewSet):
	"""
	Shop Api
	"""
	queryset = Shop.objects.all()
	serializer_class = ShopCreationSerializer
	permission_classes = [IsAuthenticated, IsShopOwner]

	def get_serializer_class(self):
		serializer_class = self.serializer_class
		if self.request.method == 'PUT':
			serializer_class = ShopSerializer
		return serializer_class

	#todo forbid to create shop for other user

	@detail_route(methods=['get',], permission_classes=[IsAuthenticated])
	def seller(self, request, pk):
		shops = self.get_queryset().filter(seller__id=pk)
		return Response(self.get_serializer_class()(shops, many=True).data)

	@list_route(methods=['get',], permission_classes=[AllowAny])
	def categories(self, request, format=None):
		cats = list(ShopCategory.objects.all().values())
		return Response(cats)