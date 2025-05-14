from django.contrib import admin
from .models import (
    Product, Category, Customer, Order, CartItem,
    Payment, Wishlist, Review, ProductVariant, ProductImage
)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "price", "stock_quantity", "category")  # Use correct field name
    search_fields = ("name",)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("username", "full_name", "email", "phone_number", "created_at")

    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()
    full_name.short_description = "Name"

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("customer", "status", "total_amount", "added_at")  

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("get_product", "quantity", "get_customer")

    def get_product(self, obj):
        return obj.product_variant.product.name
    get_product.short_description = "Product"

    def get_customer(self, obj):
        return obj.cart.user  # Or obj.cart.customer depending on your model
    get_customer.short_description = "Customer"


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("order", "payment_method", "status", "amount")  # Use correct field names


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ("customer", "get_product")

    def get_product(self, obj):
        return obj.product_variant.product.name
    get_product.short_description = "Product"


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("customer", "get_product", "rating")

    def get_product(self, obj):
        return obj.product_variant.product.name
    get_product.short_description = "Product"


@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ("product", "price", "stock_quantity")  


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("product", "get_image_url")

    def get_image_url(self, obj):
        return obj.image.url if obj.image else "-"
    get_image_url.short_description = "Image"
