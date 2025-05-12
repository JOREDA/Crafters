from django.test import TestCase
from django.urls import reverse
from crafters.models import Product, Category, Customer, Cart, CartItem, Order, OrderItem, Payment

# --------------- PRODUCT MODEL TEST ----------------
class ProductModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Electronics", description="Electronic devices")
        self.product = Product.objects.create(name="Laptop", description="A high-end laptop", price=1200, stock_quantity=10, category=self.category)

    def test_product_creation(self):
        product = self.product
        self.assertEqual(product.name, "Basket")
        self.assertEqual(product.price, 1200)
        self.assertEqual(product.stock_quantity, 10)
        self.assertEqual(product.category.name, "BambooProducts")

    def test_product_str_method(self):
        product = self.product
        self.assertEqual(str(product), "Basket")


# --------------- PRODUCT VIEW TEST ----------------
class ProductViewTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="BambooProducts", description="Product made of bamboo")
        self.product = Product.objects.create(name="Basket", description="A high-end laptBasketop", price=1200, stock_quantity=10, category=self.category)

    def test_product_list_view(self):
        response = self.client.get(reverse('product-list'))  # Assuming you have a URL pattern named 'product-list'
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.product.name)
        self.assertContains(response, self.product.price)


# --------------- CUSTOMER MODEL TEST ----------------
class CustomerModelTest(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create_user(username="john_doe", email="john@example.com", password="password123")

    def test_customer_creation(self):
        customer = self.customer
        self.assertEqual(customer.username, "john_doe")
        self.assertEqual(customer.email, "john@example.com")
        self.assertTrue(customer.check_password("password123"))

    def test_customer_str_method(self):
        customer = self.customer
        self.assertEqual(str(customer), "john_doe")


# --------------- CART TEST ----------------
class CartTest(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create_user(username="john_doe", email="john@example.com", password="password123")
        self.category = Category.objects.create(name="Electronics", description="Electronic devices")
        self.product = Product.objects.create(name="Laptop", description="A high-end laptop", price=1200, stock_quantity=10, category=self.category)
        self.cart = Cart.objects.create(customer=self.customer)

    def test_add_to_cart(self):
        response = self.client.post(reverse('cart-add'), {'product_id': self.product.id, 'quantity': 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.cart.items.count(), 1)

    def test_cart_item_quantity(self):
        CartItem.objects.create(cart=self.cart, product=self.product, quantity=1)
        cart_item = self.cart.items.first()
        self.assertEqual(cart_item.quantity, 1)


# --------------- ORDER TEST ----------------
class OrderTest(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create_user(username="john_doe", email="john@example.com", password="password123")
        self.category = Category.objects.create(name="Electronics", description="Electronic devices")
        self.product = Product.objects.create(name="Laptop", description="A high-end laptop", price=1200, stock_quantity=10, category=self.category)
        self.cart = Cart.objects.create(customer=self.customer)
        CartItem.objects.create(cart=self.cart, product=self.product, quantity=1)

    def test_create_order(self):
        response = self.client.post(reverse('order-create'), {'customer': self.customer.id, 'cart': self.cart.id})
        self.assertEqual(response.status_code, 201)
        order = Order.objects.first()
        self.assertEqual(order.customer, self.customer)
        self.assertEqual(order.items.count(), 1)

    def test_order_total_amount(self):
        order = Order.objects.create(customer=self.customer, status='pending', subtotal=1200, shipping_cost=50, total_amount=1250)
        self.assertEqual(order.total_amount, 1250)

    def test_order_item(self):
        order = Order.objects.create(customer=self.customer, status='pending', subtotal=1200, shipping_cost=50, total_amount=1250)
        order_item = OrderItem.objects.create(order=order, product=self.product, quantity=1, price=self.product.price)
        self.assertEqual(order_item.product.name, "Laptop")
        self.assertEqual(order_item.quantity, 1)


# --------------- PAYMENT TEST ----------------
class PaymentTest(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create_user(username="john_doe", email="john@example.com", password="password123")
        self.order = Order.objects.create(customer=self.customer, status='pending', subtotal=1200, shipping_cost=50, total_amount=1250)

    def test_payment_success(self):
        response = self.client.post(reverse('payment'), {'order_id': self.order.id, 'payment_method': 'credit_card', 'amount': 1250})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.order.status, 'paid')

    def test_payment_failure(self):
        response = self.client.post(reverse('payment'), {'order_id': self.order.id, 'payment_method': 'credit_card', 'amount': 1000})
        self.assertEqual(response.status_code, 400)  # Insufficient amount
        self.assertEqual(self.order.status, 'pending')


# --------------- ORDER ITEM TEST ----------------
class OrderItemTest(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create_user(username="john_doe", email="john@example.com", password="password123")
        self.category = Category.objects.create(name="Electronics", description="Electronic devices")
        self.product = Product.objects.create(name="Laptop", description="A high-end laptop", price=1200, stock_quantity=10, category=self.category)
        self.order = Order.objects.create(customer=self.customer, status='pending', subtotal=1200, shipping_cost=50, total_amount=1250)
        self.order_item = OrderItem.objects.create(order=self.order, product=self.product, quantity=1, price=self.product.price)

    def test_order_item_creation(self):
        order_item = self.order_item
        self.assertEqual(order_item.product.name, "Laptop")
        self.assertEqual(order_item.quantity, 1)
        self.assertEqual(order_item.price, 1200)


# --------------- CUSTOMER AUTH TEST ----------------
class CustomerAuthTest(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create_user(username="john_doe", email="john@example.com", password="password123")

    def test_login_success(self):
        response = self.client.post(reverse('login'), {'username': 'john_doe', 'password': 'password123'})
        self.assertEqual(response.status_code, 200)

    def test_login_failure(self):
        response = self.client.post(reverse('login'), {'username': 'john_doe', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, 400)  # Invalid login


# --------------- CART AND CHECKOUT TEST ----------------
class CartCheckoutTest(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create_user(username="john_doe", email="john@example.com", password="password123")
        self.category = Category.objects.create(name="Electronics", description="Electronic devices")
        self.product = Product.objects.create(name="Laptop", description="A high-end laptop", price=1200, stock_quantity=10, category=self.category)
        self.cart = Cart.objects.create(customer=self.customer)
        CartItem.objects.create(cart=self.cart, product=self.product, quantity=1)

    def test_checkout(self):
        response = self.client.post(reverse('checkout'), {'cart_id': self.cart.id, 'payment_method': 'credit_card'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.cart.items.count(), 1)
        self.assertEqual(self.customer.orders.count(), 1)
