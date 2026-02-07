from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from crafters.views import (
    CustomerViewSet, CategoryViewSet, ProductViewSet, ContactMessageViewSet,
    CartViewSet, CartItemViewSet, WishlistViewSet, WishlistItemViewSet,
    OrderViewSet, OrderItemViewSet, PaymentViewSet, ReviewViewSet, WebsiteReviewsViewSet,
    RegisterView, CheckoutView, AdminDetailsView
)

# Toggle this to True to re-enable the API endpoints. Set to False to disconnect frontend.
ENABLE_API = True

if ENABLE_API:
    router = DefaultRouter()
    router.register(r'customers', CustomerViewSet)
    router.register(r'categories', CategoryViewSet)
    router.register(r'products', ProductViewSet)
    router.register(r'contact-messages', ContactMessageViewSet)
    router.register(r'carts', CartViewSet, basename='cart')
    router.register(r'cart-items', CartItemViewSet, basename='cartitem')
    router.register(r'wishlists', WishlistViewSet, basename='wishlist_view')
    router.register(r'wishlist-items', WishlistItemViewSet, basename='wishlist_item')
    router.register(r'orders', OrderViewSet)
    router.register(r'order-items', OrderItemViewSet, basename='orderitem')
    router.register(r'payments', PaymentViewSet, basename='payment')
    router.register(r'reviews', ReviewViewSet, basename='review')
    router.register(r'website-reviews', WebsiteReviewsViewSet)

    urlpatterns = [
        path('api/', include(router.urls)),
        path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('api/admin-details/', AdminDetailsView.as_view(), name='admin-details'),
        path('api/checkout/', CheckoutView.as_view(), name='checkout'),
        path('api/register/', RegisterView.as_view(), name='register'),
    ]
else:
    # API disabled: provide an empty urlpatterns so the backend still runs but exposes no API endpoints.
    urlpatterns = []
