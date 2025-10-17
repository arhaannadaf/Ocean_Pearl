import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface CartDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { state } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hooks must always run
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose(); // call parent
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Now conditionally render
  if (!isOpen) return null;

  const displayItems = state.items.slice(0, 2);
  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border">
      <div className="p-4">
        {state.items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              {displayItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm uppercase">{item.name}</h4>
                    <p className="text-gray-600 text-sm">
                      {item.quantity} × ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              {state.items.length > 2 && (
                <p className="text-gray-500 text-sm text-center">+{state.items.length - 2} more items</p>
              )}
            </div>

            <div className="border-t pt-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">SUBTOTAL:</span>
                <span className="font-bold text-lg">₹{state.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link href="/cart" onClick={onClose}>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">VIEW CART</Button>
              </Link>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">CHECKOUT</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
