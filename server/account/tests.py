from account.models import Account
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import pdb

class AccountTest(APITestCase):
    def setUp(self):
        self.superuser = Account.objects.create_superuser('supermario12342003@gmail.com', 'johnpassword')
        self.client.login(email='supermario12342003@gmail.com', password='johnpassword')

    def test_put(self):
    	response = self.client.post('/api/accounts/1/changepassword/', {
    		'old_password' : 'johnpassword',
    		'new_password' : '123123',
    		})
    	print response
    '''
    def test_addpicture(self):
    	file = open("../image.png", "r+")
        response = self.client.post('/api/accounts/addpicture/', {'file': file}, format='multipart')
        print response.data
    '''
