from rest_framework import serializers
from shop.models import Shop

class ShopCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('id', 'name', 'category',
                  'seller', 'lng', 'lat', 'address', 'category_name', 'validated', 'rejected', 'reject_reason')
        read_only_fields = ('validated', 'rejected', 'reject_reason')

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('id', 'name', 'category',
                  'seller', 'lng', 'lat', 'address', 'category_name', 'validated', 'rejected', 'reject_reason')
        read_only_fields = ('seller', 'validated', 'rejected', 'reject_reason')