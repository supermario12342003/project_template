# -*- coding: utf-8 -*-
from product.models import Product
from product.serializers import ProductSerializer, ProductCreationSerializer
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from product.permissions import IsProductOwner
from rest_framework.permissions import AllowAny
from rest_framework.decorators import list_route, detail_route
from rest_framework.permissions import IsAuthenticated
import json
import pdb
from django.utils.translation import ugettext as _
from django.conf import settings
from core.utils.email import send_email

class ProductViewSet(viewsets.ModelViewSet):
	"""
	Product Api
	"""
	queryset = Product.objects.all()
	serializer_class = ProductCreationSerializer
	permission_classes = [IsAuthenticated, IsProductOwner]

	def get_serializer_class(self):
		serializer_class = self.serializer_class
		if self.request.method == 'PUT':
			serializer_class = ProductSerializer
		return serializer_class

	@detail_route(methods=['get',], permission_classes=[IsAuthenticated])
	def shop(self, request, pk):
		products = self.get_queryset().filter(shop__id=pk)
		return Response(self.get_serializer_class()(products, many=True).data)