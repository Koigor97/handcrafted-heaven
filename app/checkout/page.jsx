
'use client';

import { useState, useEffect } from 'react';
import { getLocalStorage, addItemToLocalStorage } from '@/utils/helper';
import { Button } from '@/components/ui/button'; // Assuming this is your button component
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const router = useRouter();

    // Fetch cart items on component mount
    useEffect(() => {
        const items = getLocalStorage('cart') || [];
        setCartItems(items);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handlePlaceOrder = () => {
        // Save or submit order information
        console.log('Order placed with:', { cartItems, shippingAddress, paymentMethod });
        // Clear cart and redirect
        addItemToLocalStorage('cart', []);
        setCartItems([]);
        router.push('/order-confirmation'); // Redirect to order confirmation page
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            
            {/* Order Summary */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                {cartItems.length > 0 ? (
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <li key={item.id} className="flex justify-between items-center border-b py-2">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}
                <div className="mt-4 font-bold text-xl">Total: ${calculateTotal()}</div>
            </div>

            {/* Shipping Information */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
                <form className="grid gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={shippingAddress.name}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={shippingAddress.address}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={shippingAddress.state}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="zip"
                        placeholder="ZIP Code"
                        value={shippingAddress.zip}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={shippingAddress.country}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                    />
                </form>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
                <select
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    className="p-2 border rounded"
                >
                    <option value="">Select Payment Method</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    {/* Add other payment methods here */}
                </select>
            </div>

            {/* Place Order Button */}
            <Button
                onClick={handlePlaceOrder}
                className="bg-primary text-white mt-4 w-full"
                disabled={cartItems.length === 0 || !paymentMethod || !shippingAddress.name || !shippingAddress.address}
            >
                Place Order
            </Button>
        </div>
    );
}

