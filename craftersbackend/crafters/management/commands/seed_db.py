from django.core.management.base import BaseCommand
from django.db import transaction

from crafters.models import (
    Customer, CustomerAddress, Category, Product, ProductImage, ProductVariant,
    ContactMessage, Cart, CartItem, Wishlist, WishlistItem, Order, OrderItem,
    Payment, Review, ContactUs, WebsiteReviews, AdminDetails
)


class Command(BaseCommand):
    help = "Seed the database with dummy data for development"

    def handle(self, *args, **options):
        with transaction.atomic():
            self.stdout.write("Seeding database...")

            # Admin details
            admin, _ = AdminDetails.objects.get_or_create(
                companyname="Crafters Co.",
                defaults={
                    "slogan": "Handmade, with love",
                    "aboutus": "Crafters is a demo site for handcrafted home goods."
                }
            )

            # Create a test customer
            if not Customer.objects.filter(username="testuser").exists():
                user = Customer.objects.create_user(
                    username="testuser",
                    email="testuser@example.com",
                    password="testpass123",
                    first_name="Test",
                    last_name="User",
                    phone_number="1234567890",
                )
            else:
                user = Customer.objects.get(username="testuser")

            # Address
            addr, _ = CustomerAddress.objects.get_or_create(
                customer=user,
                address_line="123 Demo St",
                city="Demo City",
                state="Demo State",
                country="Demo Country",
                postal_code="12345",
                phone_number="1234567890",
                is_default_billing=True,
                is_default_shipping=True,
            )

            # Categories
            cat_home, _ = Category.objects.get_or_create(name="Home Decor", defaults={"description": "Decorative items"})
            cat_storage, _ = Category.objects.get_or_create(name="Storage", defaults={"description": "Storage solutions"})

            # Products
            if not Product.objects.filter(name="Woven Basket").exists():
                p1 = Product.objects.create(
                    name="Woven Basket",
                    description="Handmade woven basket",
                    price=29.99,
                    stock_quantity=50,
                    category=cat_home,
                )
                ProductImage.objects.create(product=p1, image_url="https://placehold.co/400x400.png?text=Woven+Basket")
                ProductVariant.objects.create(product=p1, size="M", price=29.99, stock_quantity=20)

            if not Product.objects.filter(name="Storage Box").exists():
                p2 = Product.objects.create(
                    name="Storage Box",
                    description="Durable storage box",
                    price=19.99,
                    stock_quantity=100,
                    category=cat_storage,
                )
                ProductImage.objects.create(product=p2, image_url="https://placehold.co/400x400.png?text=Storage+Box")
                ProductVariant.objects.create(product=p2, size="L", price=19.99, stock_quantity=60)

            # Contact message
            ContactMessage.objects.get_or_create(
                email="visitor@example.com",
                first_name="Visitor",
                last_name="One",
                message="This is a sample contact message.",
            )

            # Cart and items
            cart, _ = Cart.objects.get_or_create(customer=user)
            # attach first product variant to cart
            first_variant = ProductVariant.objects.first()
            if first_variant:
                CartItem.objects.get_or_create(cart=cart, product_variant=first_variant, defaults={"quantity": 2})

            # Wishlist
            wishlist, _ = Wishlist.objects.get_or_create(customer=user)
            if first_variant:
                WishlistItem.objects.get_or_create(wishlist=wishlist, product_variant=first_variant)

            # Order
            order, created = Order.objects.get_or_create(
                customer=user,
                defaults={
                    "billing_address": addr,
                    "shipping_address": addr,
                    "status": "completed",
                    "order_date": None,
                    "subtotal": 49.98,
                    "shipping_cost": 5.00,
                    "tax": 3.00,
                    "discount": 0.00,
                    "total_amount": 57.98,
                }
            )
            if first_variant and created:
                OrderItem.objects.create(order=order, product_variant=first_variant, quantity=1, price_at_purchase=first_variant.price or 0)

            # Payment
            Payment.objects.get_or_create(order=order, defaults={"amount": order.total_amount or 0, "payment_method": "card", "status": "paid"})

            # Review
            Review.objects.get_or_create(product=Product.objects.first(), customer=user, defaults={"rating": 5, "comment": "Lovely product!"})

            # Contact us generic
            ContactUs.objects.get_or_create(FirstName="Anonymous", LastName="Visitor")

            # Website reviews
            WebsiteReviews.objects.get_or_create(review="Great shopping experience!")

            self.stdout.write(self.style.SUCCESS("Database seeded."))