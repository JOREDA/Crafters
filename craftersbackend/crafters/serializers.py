from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from crafters.models import (
    Customer, Category, Product, ContactMessage, Cart, CartItem,
    Wishlist, WishlistItem, Order, OrderItem, Payment, Review,
    ProductImage, CustomerAddress, WebsiteReviews, AdminDetails,
    ProductVariant
)

# ---------- AUTH ----------
class CustomerRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Customer
        fields = ('username', 'email', 'phone_number', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn’t match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = Customer.objects.create_user(**validated_data)
        return user

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'username', 'email', 'phone_number', 'date_joined')
        read_only_fields = ('id', 'date_joined')

# ---------- PRODUCT ----------
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image_url']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'product', 'size', 'price', 'stock_quantity']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock_quantity', 'category', 'images', 'variants']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'parent_category']

# ---------- CART & WISHLIST ----------
class CartItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product_variant', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'customer', 'session_token', 'items', 'created_at']
        read_only_fields = ['id', 'created_at']

class WishlistItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True)

    class Meta:
        model = WishlistItem
        fields = ['id', 'product_variant', 'added_at']

class WishlistSerializer(serializers.ModelSerializer):
    items = WishlistItemSerializer(many=True, read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'customer', 'session_token', 'items', 'created_at']
        read_only_fields = ['id', 'created_at']

# ---------- ORDER & PAYMENT ----------
class OrderItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product_variant', 'quantity', 'price_at_purchase']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'billing_address', 'shipping_address',
            'order_date', 'status', 'subtotal', 'shipping_cost',
            'tax', 'discount', 'total_amount', 'items'
        ]
        read_only_fields = ['id', 'order_date', 'total_amount']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'payment_date', 'amount', 'payment_method', 'status']
        read_only_fields = ['id', 'payment_date']

# ---------- MISC ----------
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'email', 'first_name', 'last_name', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'product', 'customer', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'created_at']

class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = [
            'id', 'customer', 'address_line', 'city', 'state', 'country',
            'postal_code', 'phone_number', 'is_default_billing', 'is_default_shipping'
        ]
        read_only_fields = ['id']

class WebsiteReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteReviews
        fields = ['id', 'review']
        read_only_fields = ['id']

class AdminDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminDetails
        fields = ['id', 'companyname', 'slogan', 'aboutus']
        read_only_fields = ['id']
