'use client';

import { ShoppingCart, Heart, X, User, Package, LogOut} from 'lucide-react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getLocalStorage, deleteItemFromLocalStorage } from '@/utils/helper';
import {useState} from 'react';
import Image from 'next/image';

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

    return (
            isLoggedIn ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="h-10 w-10 flex items-center justify-center rounded-full bg-primary p-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                            <Image src="https://res.cloudinary.com/handcrafted-haven/image/upload/v1727335990/rajesh-kumar_u8q6ja.webp" alt="avatar" width={40} height={40} className="rounded-full object-cover"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 bg-primary border-none">
                        <DropdownMenuLabel className="text-text-950">My Account</DropdownMenuLabel>
                        <DropdownMenuItem className="text-text-800"><Link href="/profile" className="flex flex-row gap-2"><User className="stroke-1"/> My Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem className="text-text-800"><Link href="/orders" className="flex flex-row gap-2"><Package className="stroke-1"/> My Orders</Link></DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-background1-300"/>
                        <DropdownMenuItem className="text-text-800 gap-2"><LogOut className="stroke-1"/> Log Out</DropdownMenuItem>
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

    const handleDeleteItem = (productId) => {
        deleteItemFromLocalStorage('wishlist', productId);
        setWishlistItems(getLocalStorage('wishlist'));
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-10 w-10 flex items-center justify-center rounded-full bg-primary p-0"><Heart className="fill-current"/></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-primary border-none">
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
                                        <Button className="border-2 border-foreground px-2 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" onClick={() => handleDeleteItem(item.productId)}>
                                            <X/>
                                        </Button>
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
    return (
        <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href="/cart">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary hover:cursor-pointer">
                                <ShoppingCart/>
                            </div>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-background border-none"><p>Go to cart</p></TooltipContent>
                </Tooltip>
            </TooltipProvider>
    )
}