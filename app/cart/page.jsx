

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getLocalStorage, deleteItemFromLocalStorage, formatPrice } from '@/utils/helper';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const [cartItems, setCartItems] = useState(getLocalStorage('cart') || []);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleQuantityChange = (productId, change) => {
        const updatedCart = cartItems.map(item => {
            if (item.productId === productId) {
                const newQuantity = item.quantity + change;

                if (newQuantity <= 0) {
                    deleteItemFromLocalStorage('cart', item.productId);
                    return null; // Remove item from the cart
                }

                return { ...item, quantity: newQuantity }; // Update quantity
            }
            return item; // Unchanged item
        }).filter(item => item !== null); // Filter out removed items

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
    };

    const calculateTotal = () => {
        return cartItems.reduce((accumulator, item) => {
            return accumulator + (parseFloat(item.price) * item.quantity);
        }, 0).toFixed(2);
    };

    const handleCheckout = () => {
        console.log('Proceeding to checkout...');
        //Redirect to the checkout page
        router.push('/checkout');
    };

    if (!isMounted) {
        return null; // or a loading indicator
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <li key={item.productId} className="flex items-center justify-between border-b py-2">
                                <div className="flex items-center">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                                    <div>
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">{formatPrice(item.price)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Button onClick={() => handleQuantityChange(item.productId, -1)} disabled={item.quantity <= -1}>
                                        -
                                    </Button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <Button onClick={() => handleQuantityChange(item.productId, 1)}>+</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-between">
                        <h2 className="text-xl font-bold">Total: ${calculateTotal()}</h2>
                        <Button onClick={handleCheckout} className="bg-primary text-white">Checkout</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
