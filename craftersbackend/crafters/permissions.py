from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminUserCustom(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff

# 1. Only allow access to authenticated customers
class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated


# 2. Allow only owners to update/delete their carts, wishlists, or orders
class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        customer = self.get_customer(obj)
        return customer == request.user if customer else False

    def get_customer(self, obj):
        """
        Utility function to extract the customer from various objects.
        """
        if hasattr(obj, 'customer'):
            return obj.customer
        elif hasattr(obj, 'cart') and hasattr(obj.cart, 'customer'):
            return obj.cart.customer
        elif hasattr(obj, 'wishlist') and hasattr(obj.wishlist, 'customer'):
            return obj.wishlist.customer
        elif hasattr(obj, 'order') and hasattr(obj.order, 'customer'):
            return obj.order.customer
        return None


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
