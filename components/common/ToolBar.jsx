'use client';

import { ShoppingCart, Heart, X, User, Package, LogOut, UserCheck} from 'lucide-react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getLocalStorage, deleteItemFromLocalStorage, addItemToLocalStorage } from '@/utils/helper';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { isUserLoggedIn, logOut } from '@/utils/authAction';

export default function ToolBar() {

    return (
        <div className="flex justify-end items-center h-10 gap-2">
            <AvatarMenu/>
            <WishlistPopover/>
            <CartIconLink/>
        </div>
    )
}

function AvatarMenu() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({})
    const router = useRouter()

    useEffect(()=> {
        const fetchUser = async () => {

            try {
                    const user = await isUserLoggedIn();
                    setIsLoggedIn(!!user);
                    setUser(user)
                } catch (error) {
                console.log(error);
            }
        }

        fetchUser();
    }, [])

    const handleLogOut = async () => {
        await logOut();
        setUser(null)
        setIsLoggedIn(false)
        router.push('/')
    }
    return (
            isLoggedIn ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-10 w-10 flex items-center justify-center rounded-full bg-primary p-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                            {
                                user.user_image_url ? (

                                    <Image src={user.user_image_url} alt={`${user.name} image`} width={40} height={40} className="rounded-full object-cover"/>
                                ) : (<UserCheck data-name={user.name} />)
                            }
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 bg-primary border-none">
                        <DropdownMenuLabel className="text-text-950">My Account</DropdownMenuLabel>
                        <DropdownMenuItem className="text-text-800"><Link href="/profile" className="flex flex-row gap-2"><User className="stroke-1"/> My Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem className="text-text-800"><Link href="/orders" className="flex flex-row gap-2"><Package className="stroke-1"/> My Orders</Link></DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-background1-300"/>
                        <DropdownMenuItem className="text-text-800 gap-2 cursor-pointer" onClick={handleLogOut}>
                                <LogOut className="stroke-1"/> Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            ) : (<Button className="h-10 w-10 flex items-center justify-center rounded-full bg-primary p-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                    <User/>
                </Button>)
    )
}

function WishlistPopover() {
    const wishlist = getLocalStorage('wishlist');

    const [wishlistItems, setWishlistItems] = useState(wishlist);

    const handleStorageUpdate = () => {
        const updatedWishlist = getLocalStorage('wishlist');
        setWishlistItems(updatedWishlist);
    }

    useEffect(() => {

        window.addEventListener('wishlistUpdated', handleStorageUpdate);

        return () => {
            window.removeEventListener('wishlistUpdated', handleStorageUpdate);
        }
    }, [])

    const handleDeleteItem = (productId) => {
        deleteItemFromLocalStorage('wishlist', productId);
        setWishlistItems(getLocalStorage('wishlist'));

        window.dispatchEvent(new Event('deletedFromWishlist'));
    }

    const handleAddToCart = (item) => {
        
        addItemToLocalStorage('cart', item);
        deleteItemFromLocalStorage('wishlist', item.productId);
        setWishlistItems(getLocalStorage('wishlist')); // Update wishlist state

        // Dispatch events to update both cart and wishlist
        window.dispatchEvent(new Event('cartUpdated'));
        window.dispatchEvent(new Event('wishlistUpdated'));
        window.dispatchEvent(new Event('deletedFromWishlist'));
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
            <div className="relative">
                    <Button className="h-10 w-10 flex items-center justify-center rounded-full bg-primary p-0">
                        <Heart className="fill-current" />
                    </Button>
                    {wishlistItems.length > 0 && (
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                            {wishlistItems.length}
                        </span>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-100 bg-primary border-none">
                {
                    wishlistItems.length > 0 ? (
                        <ul className="flex flex-col gap-3">
                            {
                                wishlistItems.map((item) => (
                                    <li className="flex items-center justify-between gap-2" key={item.productId}>
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            className="object-cover rounded-sm"
                                        />
                                        <span className="w-full line-clamp-1">{item.name}</span>
                                <div className="flex gap-2">
                                    {/* Delete button */}
                                    <Button className="border-2 border-foreground px-2 focus:outline-none" onClick={() => handleDeleteItem(item.productId)}>
                                        <X />
                                    </Button>
                                    {/* Add to Cart button */}
                                    <Button className="border-2 border-foreground px-2 focus:outline-none" onClick={() => handleAddToCart(item)}>
                                        Add to Cart
                                    </Button>
                                </div>
                                    </li>
                                ))
                            }
                        </ul> ) : (<p>You have {wishlistItems.length} items in your wishlist</p>)
                }
            </PopoverContent>
        </Popover>
    )
}

function CartIconLink() {
    const [cartItems, setCartItems] = useState(getLocalStorage('cart') || []);

    console.log('cartItems:', cartItems);

    // Function to handle updates from local storage
    const handleStorageUpdate = () => {
        const updatedCart = getLocalStorage('cart');
        setCartItems(updatedCart);
    };

    // Set up event listeners for cart updates
    useEffect(() => {
        window.addEventListener('cartUpdated', handleStorageUpdate);
        return () => {
            window.removeEventListener('cartUpdated', handleStorageUpdate);
        };
    }, []);
    return (
        <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <div className="relative">
                    <Link href="/cart">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary hover:cursor-pointer">
                            <ShoppingCart />
                        </div>
                    </Link>
                    {cartItems.length > 0 && (
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                            {cartItems.length}
                        </span>
                    )}
                </div>
                    
                    </TooltipTrigger>
                    <TooltipContent className="bg-background border-none"><p>Go to cart</p></TooltipContent>
                </Tooltip>
            </TooltipProvider>
    )
}