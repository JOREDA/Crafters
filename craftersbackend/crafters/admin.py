from django.contrib import admin
from crafters.models import (
    Customer, Category, Product, ProductImage, ProductVariant, 
    Cart, CartItem, Wishlist, WishlistItem, Order, OrderItem, 
    Payment, Review, CustomerAddress, WebsiteReviews, AdminDetails, ContactMessage
)

# ---------- AUTH ----------
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone_number', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'phone_number')
    list_filter = ('is_active', 'is_staff', 'is_superuser')

# ---------- CATEGORY ----------
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'parent_category')
    search_fields = ('name',)
    list_filter = ('parent_category',)

# ---------- PRODUCT ----------
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock_quantity', 'category', 'created_at')
    search_fields = ('name', 'category__name')
    list_filter = ('category',)

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'image_url')
    search_fields = ('product__name',)

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('product', 'size', 'price', 'stock_quantity')
    search_fields = ('product__name', 'size')

# ---------- CART & WISHLIST ----------
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('customer', 'session_token', 'created_at')
    search_fields = ('customer__username', 'session_token')

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product_variant', 'quantity')
    search_fields = ('cart__session_token', 'product_variant__product__name')

@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ('customer', 'session_token', 'created_at')
    search_fields = ('customer__username', 'session_token')

@admin.register(WishlistItem)
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ('wishlist', 'product_variant')
    search_fields = ('wishlist__session_token', 'product_variant__product__name')

# ---------- ORDER & PAYMENT ----------
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('customer', 'status', 'order_date', 'subtotal', 'total_amount')
    search_fields = ('customer__username', 'status')
    list_filter = ('status',)

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product_variant', 'quantity', 'price_at_purchase')
    search_fields = ('order__id', 'product_variant__product__name')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'payment_method', 'status', 'payment_date', 'amount')
    search_fields = ('order__id', 'payment_method')
    list_filter = ('status',)

# ---------- REVIEWS ----------
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'customer', 'rating', 'created_at')
    search_fields = ('product__name', 'customer__username')
    list_filter = ('rating',)

# ---------- CONTACT & MISC ----------
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'created_at')
    search_fields = ('first_name', 'last_name', 'email')
    list_filter = ('created_at',)

@admin.register(WebsiteReviews)
class WebsiteReviewsAdmin(admin.ModelAdmin):
    list_display = ('review',)
    search_fields = ('review',)

@admin.register(AdminDetails)
class AdminDetailsAdmin(admin.ModelAdmin):
    list_display = ('companyname', 'slogan', 'aboutus')
    search_fields = ('companyname',)

@admin.register(CustomerAddress)
class CustomerAddressAdmin(admin.ModelAdmin):
    list_display = ('customer', 'address_line', 'city', 'state', 'postal_code', 'is_default_billing', 'is_default_shipping')
    search_fields = ('customer__username', 'address_line', 'city', 'state', 'postal_code')

