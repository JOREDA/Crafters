from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from shop.models import Product, ProductVariant, Cart, CartItem, Order

User = get_user_model()

class ArtisanEcommerceTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='artisanlover', password='secure123')
        self.client.force_authenticate(user=self.user)

        self.product = Product.objects.create(
            name='Handmade Ceramic Vase',
            description='A beautiful handcrafted vase made by local artisans.',
            base_price=1500,
            stock_quantity=10,
            category='Home Decor'
        )

        self.variant = ProductVariant.objects.create(
            product=self.product,
            name='Medium',
            additional_price=200,
            stock=5
        )

    def test_add_product_to_cart(self):
        """Ensure user can add artisan product to cart"""
        response = self.client.post('/api/cart/add/', {
            'product_variant_id': self.variant.id,
            'quantity': 2
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(CartItem.objects.count(), 1)

    def test_prevent_adding_more_than_stock(self):
        """Should not allow adding more items than available"""
        response = self.client.post('/api/cart/add/', {
            'product_variant_id': self.variant.id,
            'quantity': 10
        })
        self.assertEqual(response.status_code, 400)

    def test_partial_stock_add_to_cart(self):
        """Should add only available stock and return 206 with a message"""
        response = self.client.post('/api/cart/add/', {
            'product_variant_id': self.variant.id,
            'quantity': 10  # only 5 in stock
        })
        self.assertEqual(response.status_code, 206)
        self.assertIn('partial_fill', response.data)
        self.assertEqual(response.data['quantity_added'], 5)

    def test_add_nonexistent_variant_to_cart(self):
        """Should return 404 when product variant does not exist"""
        response = self.client.post('/api/cart/add/', {
            'product_variant_id': 9999,
            'quantity': 1
        })
        self.assertEqual(response.status_code, 404)

    def test_guest_can_add_to_cart_session_based(self):
        """Guest users should be able to add items to a session-based cart"""
        self.client.force_authenticate(user=None)
        response = self.client.post('/api/cart/add/', {
            'product_variant_id': self.variant.id,
            'quantity': 1
        })
        self.assertEqual(response.status_code, 201)
        # Additional check for session can go here

    def test_user_can_remove_cart_item(self):
        """User should be able to remove item from their cart"""
        cart = Cart.objects.get_or_create(user=self.user)[0]
        item = CartItem.objects.create(cart=cart, product_variant=self.variant, quantity=1)
        response = self.client.delete(f'/api/cart/remove/{item.id}/')
        self.assertEqual(response.status_code, 204)
        self.assertFalse(CartItem.objects.filter(id=item.id).exists())

    def test_create_order_from_cart(self):
        """User can convert cart into order for artisan goods"""
        CartItem.objects.create(
            cart=Cart.objects.get_or_create(user=self.user)[0],
            product_variant=self.variant,
            quantity=2
        )
        response = self.client.post('/api/orders/create/')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Order.objects.count(), 1)

    def test_reduce_stock_after_order(self):
        """Stock should reduce after successful order"""
        CartItem.objects.create(
            cart=Cart.objects.get_or_create(user=self.user)[0],
            product_variant=self.variant,
            quantity=3
        )
        self.client.post('/api/orders/create/')
        self.variant.refresh_from_db()
        self.assertEqual(self.variant.stock, 2)

    def test_duplicate_review_block(self):
        """User should not be allowed to review the same product twice"""
        self.client.post(f'/api/products/{self.product.id}/reviews/', {
            'rating': 5,
            'comment': 'Amazing!'
        })
        second_response = self.client.post(f'/api/products/{self.product.id}/reviews/', {
            'rating': 4,
            'comment': 'Still good'
        })
        self.assertEqual(second_response.status_code, 400)
