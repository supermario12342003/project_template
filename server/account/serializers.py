from rest_framework import serializers
from account.models import Account
import re
from django.utils.translation import ugettext as _

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'date_joined',
                  'first_name', 'last_name', 'phone', 'address', 'photo')
        read_only_fields = ('date_joined', 'photo', 'email')

class AccountCreationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Account
        fields = ('id', 'email', 'password', 'phone')

    def validate_phone(self, value):
        #validate more later note to future self
        if value and not re.match(r'^\+?\d{10,14}$', value):
            raise serializers.ValidationError(_("Phone should at least 10 digits including country code, eg 3301234567"))
        return value