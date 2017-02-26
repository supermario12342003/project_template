from rest_framework import permissions

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']

class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, account):
    	if (request.method in SAFE_METHODS or
            request.user and account == request.user):
    		return True
        return False

class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """
    def has_permission(self, request, view):
        if (request.method in SAFE_METHODS or
            request.user and
            request.user.is_authenticated()):
            return True
        return False