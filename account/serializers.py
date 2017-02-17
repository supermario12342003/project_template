from rest_framework import serializers
from account.models import Account

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ('url', 'id', 'email', 'date_joined',
                  'first_name', 'last_name',)
        read_only_fields = ('date_joined',)

class AccountCreationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Account
        fields = ('id', 'email',
                  'first_name', 'last_name', 'password',)
