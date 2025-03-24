"use client";
import { useAtom } from "jotai";
import { cartAtom } from "../../lib/atoms";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useAtom(cartAtom);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity: quantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="mb-4 md:mb-6">
        <Link href="/">
          <Button
            variant="ghost"
            className="group flex items-center gap-2 hover:gap-3 transition-all px-0"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium hidden sm:inline">
              Вернуться к покупкам
            </span>
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-6">Корзина</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Корзина пуста</p>
      ) : (
        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border p-3 md:p-4 rounded-lg"
            >
              <div className="w-full sm:w-24">
                <Image
                  src={item.product.images[0]}
                  width={200}
                  height={200}
                  alt={item.product.title}
                  className="rounded-md object-cover aspect-square w-full sm:w-24"
                />
              </div>

              <div className="flex-1 w-full">
                <h3 className="font-medium text-base md:text-lg">
                  {item.product.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-base">
                  ${item.product.price}
                </p>

                <div className="flex items-center justify-between mt-2 md:mt-0">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>

                  <div className="text-right text-sm md:text-base font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="text-lg md:text-xl font-bold mt-4">
            Итого: ${total.toFixed(2)}
          </div>

          <Button className="w-full mt-4" size="lg">
            Оформить заказ
          </Button>
        </div>
      )}
    </div>
  );
}
