from rest_framework import viewsets, generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import transaction
from crafters.models import *
from crafters.serializers import *
from crafters.permissions import IsOwner, IsAuthenticatedOrReadOnly, IsAdminUserCustom
from crafters.services.cart_service import add_to_cart, remove_from_cart
from crafters.services.order_service import process_checkout, process_payment


class AdminDetailsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserCustom]

    def get(self, request):
        admin_details = AdminDetails.objects.first()
        if not admin_details:
            return Response({"detail": "Admin details not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = AdminDetailsSerializer(admin_details)
        return Response(serializer.data)


class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        return process_checkout(request)


class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return process_payment(request)


class RegisterView(generics.CreateAPIView):
    queryset = Customer.objects.none()
    serializer_class = CustomerRegistrationSerializer
    permission_classes = [AllowAny]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()  
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()  
    serializer_class = ProductVariantSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()  # Added queryset here
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()  # Added queryset here
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()  # Added queryset here
    serializer_class = CustomerSerializer
    permission_classes = [IsAdminUser]


class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerAddressSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return CustomerAddress.objects.filter(customer=self.request.user)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()  # Corrected the duplicate `queryset`
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Cart.objects.filter(customer=self.request.user)

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        """Custom action to add an item to the cart"""
        cart = self.get_object()
        product_variant_id = request.data.get("product_variant_id")
        quantity = request.data.get("quantity", 1)

        if not product_variant_id:
            return Response({"error": "Product variant is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product_variant = ProductVariant.objects.get(id=product_variant_id)
        except ProductVariant.DoesNotExist:
            return Response({"error": "Product variant not found"}, status=status.HTTP_404_NOT_FOUND)

        # Validate stock
        if product_variant.stock < quantity:
            return Response({"error": "Not enough stock"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the CartItem for this cart
        cart_item = CartItem.objects.create(
            cart=cart,
            product_variant=product_variant,
            quantity=quantity
        )

        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def remove_item(self, request, pk=None):
        """Custom action to remove an item from the cart"""
        cart = self.get_object()
        cart_item_id = request.data.get("cart_item_id")

        if not cart_item_id:
            return Response({"error": "Cart item id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart_item = CartItem.objects.get(id=cart_item_id, cart=cart)
        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

        # Optionally validate stock or inventory before deleting
        cart_item.delete()

        return Response({"message": "Item removed from cart"}, status=status.HTTP_204_NO_CONTENT)


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return CartItem.objects.filter(cart__customer=self.request.user)


class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()  
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Wishlist.objects.filter(customer=self.request.user)


class WishlistItemViewSet(viewsets.ModelViewSet):
    queryset = WishlistItem.objects.all()  
    serializer_class = WishlistItemSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return WishlistItem.objects.filter(wishlist__customer=self.request.user)


class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all()  
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)

class OrderItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return OrderItem.objects.filter(order__customer=self.request.user)



class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Payment.objects.filter(order__customer=self.request.user)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Review.objects.filter(customer=self.request.user)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()  
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]


class WebsiteReviewsViewSet(viewsets.ModelViewSet):
    queryset = WebsiteReviews.objects.all()  
    serializer_class = WebsiteReviewsSerializer
    permission_classes = [AllowAny]
