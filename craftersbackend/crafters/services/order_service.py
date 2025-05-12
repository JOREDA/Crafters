# services/order_service.py

from rest_framework.response import Response
from rest_framework import status
from crafters.models import Order, OrderItem, Cart, CartItem, Payment
from crafters.serializers import OrderSerializer, OrderItemSerializer, PaymentSerializer
from django.db import transaction

def process_checkout(request):
    customer = request.user
    cart = Cart.objects.filter(customer=customer).first()

    if not cart or not cart.cartitem_set.exists():
        return Response({"detail": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

    # Start the order process
    with transaction.atomic():
        order = Order.objects.create(customer=customer)

        # Add all cart items to the order
        for cart_item in cart.cartitem_set.all():
            OrderItem.objects.create(
                order=order,
                product_variant=cart_item.product_variant,
                quantity=cart_item.quantity,
                price=cart_item.product_variant.price
            )

        # Clear the cart after checkout
        cart.cartitem_set.all().delete()

        # Serialize and return the order
        order_serializer = OrderSerializer(order)
        return Response(order_serializer.data, status=status.HTTP_201_CREATED)

def process_payment(request):
    customer = request.user
    order_id = request.data.get('order_id')
    payment_method = request.data.get('payment_method')

    if not order_id or not payment_method:
        return Response({"detail": "Missing order ID or payment method."}, status=status.HTTP_400_BAD_REQUEST)

    order = Order.objects.filter(id=order_id, customer=customer).first()

    if not order:
        return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

    if order.payment_set.exists():
        return Response({"detail": "Order already paid."}, status=status.HTTP_400_BAD_REQUEST)

    # Process the payment (simplified here, in real life you would integrate with a payment gateway)
    payment = Payment.objects.create(order=order, method=payment_method, amount=order.total_amount)

    # Serialize and return the payment information
    payment_serializer = PaymentSerializer(payment)
    return Response(payment_serializer.data, status=status.HTTP_201_CREATED)
