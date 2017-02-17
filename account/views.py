# -*- coding: utf-8 -*-
from account.models import Account
from account.serializers import AccountSerializer, AccountCreationSerializer
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from account.permissions import IsAuthenticatedOrReadOnly, IsAccountOwner
from rest_framework.permissions import AllowAny
from rest_framework.decorators import list_route
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
import urllib2
import json
import pdb

class AccountViewSet(viewsets.ModelViewSet):
	"""
	Account Api
	"""
	queryset = Account.objects.all()
	serializer_class = AccountSerializer
	permission_classes = [IsAuthenticatedOrReadOnly, IsAccountOwner]

	@list_route(methods=['post',], permission_classes=[AllowAny, ])
	def register(self, request):
		serializer = AccountCreationSerializer(data=request.data)
		if serializer.is_valid():
			account = Account.objects.create(**serializer.data)
			token = Token.objects.get(user=account)
			password = serializer.validated_data['password']
			account.set_password(password)
			account.save()
			return Response({'token': token.key},
				status=status.HTTP_201_CREATED)
		else:
			return Response(serializer.errors,
						status=status.HTTP_400_BAD_REQUEST)

	@list_route(methods=['get',], permission_classes=[IsAuthenticated,])
	def me(self, request, format=None):
		return Response(self.get_serializer_class()(request.user, context={'request':request}).data);

	@list_route(methods=['post',], permission_classes=[AllowAny, ])
	def login(self, request, format=None):
		if request.user.is_authenticated():
			return Response(AccountSerializer(request.user, context={'request':request}).data)

		email = request.data.get('email', None)
		password = request.data.get('password', None)

		account = authenticate(email=email, password=password)

		if account is not None:
			if account.is_active:
				#login(request, account)
				token = Token.objects.get(user=account)
				return Response({'token': token.key})
			else:
				return Response({
					'status': 'Unauthorized',
					'message': 'This account has been disabled.'
				}, status=status.HTTP_401_UNAUTHORIZED)
		else:
			return Response({
				'status': 'Unauthorized',
				'message': 'Username/password combination invalid.'
			}, status=status.HTTP_401_UNAUTHORIZED)

	@list_route(methods=['post',])
	def logout(self, request, format=None):
		if request.user.is_authenticated():
			logout(request)
		return Response({'message':'success'})

	@list_route(methods=['get',])
	def navitia(self, request, format=None):
		token = "6c6d93d9-7953-4f5a-a087-2c0dc2efef3b";
		n_host = "https://api.navitia.io/v1/";
		url = request.GET.get('url', None)
		data = {}
		if url:
			request = urllib2.Request(n_host + url)
			request.add_header("Authorization", "6c6d93d9-7953-4f5a-a087-2c0dc2efef3b")   
			response = urllib2.urlopen(request)
			data = json.load(response) 
		return Response(data)