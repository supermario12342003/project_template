from rest_framework import serializers
from product.models import Product

class ProductCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name',
                  'shop', 'shop_name', 'validated', 'rejected', 'reject_reason')
        read_only_fields = ('validated', 'rejected', 'reject_reason')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name',
                  'shop', 'shop_name', 'validated', 'rejected', 'reject_reason')
        read_only_fields = ('shop', 'validated', 'rejected', 'reject_reason')