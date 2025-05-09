from rest_framework.permissions import BasePermission, SAFE_METHODS

# 1. Only allow access to authenticated customers
class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated


# 2. Allow only owners to update/delete their carts, wishlists, or orders
class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'customer'):
            return obj.customer == request.user
        elif hasattr(obj, 'cart') and hasattr(obj.cart, 'customer'):
            return obj.cart.customer == request.user
        elif hasattr(obj, 'wishlist') and hasattr(obj.wishlist, 'customer'):
            return obj.wishlist.customer == request.user
        elif hasattr(obj, 'order') and hasattr(obj.order, 'customer'):
            return obj.order.customer == request.user
        return False


# 3. Read-only for unauthenticated users, full access for authenticated users
class IsAuthenticatedOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated


# 4. Only admin users can access
class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff
