# services/cart_service.py

from rest_framework.response import Response
from rest_framework import status
from crafters.models import Cart, CartItem, ProductVariant
from crafters.serializers import CartItemSerializer
from django.shortcuts import get_object_or_404

def add_to_cart(request):
    customer = request.user
    product_variant_id = request.data.get('product_variant_id')
    quantity = request.data.get('quantity', 1)

    if not product_variant_id or quantity <= 0:
        return Response({"detail": "Invalid product variant or quantity."}, status=status.HTTP_400_BAD_REQUEST)

    product_variant = get_object_or_404(ProductVariant, id=product_variant_id)

    # Ensure cart exists for customer
    cart, created = Cart.objects.get_or_create(customer=customer)

    # Check if item already exists in the cart
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product_variant=product_variant)

    # Update the quantity if it already exists
    if not created:
        cart_item.quantity += quantity
        cart_item.save()
    else:
        cart_item.quantity = quantity
        cart_item.save()

    # Serialize and return the cart item
    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

def remove_from_cart(request):
    customer = request.user
    product_variant_id = request.data.get('product_variant_id')

    if not product_variant_id:
        return Response({"detail": "Product variant ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    product_variant = get_object_or_404(ProductVariant, id=product_variant_id)

    # Ensure cart exists for customer
    cart = Cart.objects.filter(customer=customer).first()
    if not cart:
        return Response({"detail": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

    # Find the cart item
    cart_item = CartItem.objects.filter(cart=cart, product_variant=product_variant).first()
    if not cart_item:
        return Response({"detail": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND)

    # Remove the cart item
    cart_item.delete()

    return Response({"detail": "Item removed from cart."}, status=status.HTTP_204_NO_CONTENT)
