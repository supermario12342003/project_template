# -*- coding: utf-8 -*-
from account.models import Account
from account.serializers import AccountSerializer, AccountCreationSerializer
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from account.permissions import IsAuthenticatedOrReadOnly, IsAccountOwner
from rest_framework.permissions import AllowAny
from rest_framework.decorators import list_route, detail_route
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
import urllib2
import json
import pdb
from django.utils.translation import ugettext as _
from django.utils import translation
from rest_framework.parsers import FormParser,MultiPartParser
from core.utils.s3 import upload
from django.conf import settings
from django.template.defaultfilters import filesizeformat
from core.utils.email import send_email
from django.contrib.sites.shortcuts import get_current_site
import base64
import uuid
import time


class AccountViewSet(viewsets.ModelViewSet):
	"""
	Account Api
	"""
	queryset = Account.objects.all()
	serializer_class = AccountSerializer
	permission_classes = [IsAuthenticatedOrReadOnly, IsAccountOwner]

	@list_route(methods=['post',], permission_classes=[AllowAny,])
	def register(self, request):
		serializer = AccountCreationSerializer(data=request.data)
		if serializer.is_valid():
			account = Account.objects.create(**serializer.data)
			token = Token.objects.get(user=account)
			password = serializer.validated_data['password']
			account.set_password(password)
			account.save()
			data = self.get_serializer_class()(account).data
			data['token'] = token.key
			return Response(data,
				status=status.HTTP_201_CREATED)
		else:
			return Response({"errors": serializer.errors},
						status=status.HTTP_400_BAD_REQUEST)

	@list_route(methods=['get',], permission_classes=[IsAuthenticated,])
	def me(self, request, format=None):
		return Response(self.get_serializer_class()(request.user).data);

	@detail_route(methods=['post'], permission_classes=[IsAccountOwner])
	def changepassword(self, request, pk):
		error = _("unknown error")
		old_password = request.data.get('old_password')
		new_password = request.data.get('new_password')

		if not old_password:
			error = _('Old password is required')
		elif old_password:
			if not new_password:
				error = _('New password is required')
			else:
				account = authenticate(email=self.request.user.email, password=old_password)
				if not account:
					error = _('Wrong old password')
				else:
					request.user.set_password(new_password)
					request.user.save()
					return Response({"success": True})
		return Response({"errors": {"old_password": [error],
				}
			},
			status=status.HTTP_400_BAD_REQUEST)

	@list_route(methods=['post'], permission_classes=[AllowAny])
	def resetpassword(self, request, format=None):
		error = _("unknown error")
		token = request.data.get('reset_token')
		email = request.data.get('email')
		new_password = request.data.get('new_password')
		user = Account.objects.get(email=email)
		if not token or not email or not user or token != user.reset_token:
			error = _("This reset link is invalid or expired")
		elif not new_password:
			error = _('New password is required')
		else:
			user.set_password(new_password)
			user.reset_token = ''
			user.save()
			return Response({"success": True})
		return Response({"errors": {"new_password": [error],
				}
			},
			status=status.HTTP_400_BAD_REQUEST)

	@list_route(methods=['post',], permission_classes=[AllowAny, ])
	def login(self, request, format=None):

		email = request.data.get('email', None)
		password = request.data.get('password', None)

		account = authenticate(email=email, password=password)

		if account is not None:
			if account.is_active:
				token = Token.objects.get(user=account)
				data = self.get_serializer_class()(account).data
				data['token'] = token.key
				return Response(data)
			else:
				return Response({
					'status': 'Unauthorized',
					'errors': {
						'email': [_('This account has been disabled.')]
					},
				}, status=status.HTTP_401_UNAUTHORIZED)
		else:
			return Response({
				'status': 'Unauthorized',
				'errors': {
					'email': [_('Email/password combination invalid.')]
				},
			}, status=status.HTTP_401_UNAUTHORIZED)

	@list_route(methods=['post',], permission_classes=[IsAccountOwner])
	def addpicture(self, request, format=None):
		error = _("unknown error")
		if request.data['file']:
			file = request.data['file']
			filename = str(request.user.id) + "_" + str(int(time.time())) + "_" + file.name
			file_type = file.content_type.split('/')[0]
			if file_type == "image":
				if file._size > settings.TASK_UPLOAD_FILE_MAX_SIZE:
					error = _('Please keep filesize under %s. Current filesize %s') % \
					(filesizeformat(settings.TASK_UPLOAD_FILE_MAX_SIZE), filesizeformat(file._size))
				else:
					try:
						path = "user_pictures/%s" % filename
						upload(file, path)
						request.user.photo = settings.MEDIA_URL + path
						request.user.save()
						return Response(self.get_serializer_class()(request.user).data);
					except:
						error = _("Upload failed, please try again later")
			else:
				error = _('This format is not supported')
		return Response({"errors": {
					"picture": [error],
				}
			},
			status=status.HTTP_400_BAD_REQUEST)


	@list_route(methods=['post',], permission_classes=[AllowAny])
	def forgotpassword(self, request, format=None):
		error = _("unknown error")
		email = request.data.get('email', None)
		if not email:
			error = _("Please provide an valid email address")
		else:
			user = Account.objects.get(email=email)
			if not user:
				error = _("No account with that email address is found")
			else:
				user.reset_token = base64.urlsafe_b64encode(uuid.uuid4().bytes).replace('=','x')
				link = get_current_site(request).domain + "/profile/reset_password?email=" + user.email + "&token=" + user.reset_token
				send_email("Password Recovery",
					{'link':link},
					[email],
					'emails/forgot_password.txt',
				)
				user.save()
			return Response({"success": True})
		return Response({"errors": {
					"picture": [error],
				}
			},
			status=status.HTTP_400_BAD_REQUEST)