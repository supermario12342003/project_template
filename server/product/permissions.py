from rest_framework import permissions

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']

class IsProductOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, shop):
    	if (request.method in SAFE_METHODS or
            request.user and product.shop.seller == request.user):
    		return True
        return False