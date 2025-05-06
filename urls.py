from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomerViewSet, CategoryViewSet, ProductViewSet, ContactMessageViewSet,
    CartViewSet, CartItemViewSet, WishlistViewSet, WishlistItemViewSet,
    OrderViewSet, OrderItemViewSet, PaymentViewSet, ReviewViewSet
)

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'contact-messages', ContactMessageViewSet)
router.register(r'carts', CartViewSet)
router.register(r'cart-items', CartItemViewSet)
router.register(r'wishlists', WishlistViewSet)
router.register(r'wishlist-items', WishlistItemViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order-items', OrderItemViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
