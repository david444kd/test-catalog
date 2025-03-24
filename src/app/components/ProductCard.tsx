"use client";
import { Product } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductCard = ({
  product,
  quantity,
  onAddToCart,
  onDecrement,
}: {
  product: Product;
  quantity: number;
  onAddToCart: () => void;
  onDecrement: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
          <CardHeader className="flex-1">
            <CardTitle className="line-clamp-2">{product.title}</CardTitle>
            <CardDescription>{product.category.name}</CardDescription>
          </CardHeader>
          <CardContent className="relative aspect-square">
            <Image
              src={product.images[0]}
              fill
              className="object-cover"
              alt={product.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-lg font-semibold">${product.price}</div>
            <div className="text-sm text-gray-500">
              {new Date(product.creationAt).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription className="line-clamp-3">
            {product.description}
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video">
          <Image
            src={product.images[0]}
            fill
            className="object-cover rounded-lg"
            alt={product.title}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Категория", "Цена", "Дата добавления", "Последнее обновление"].map(
            (label, idx) => (
              <div key={idx}>
                <p className="font-medium">{label}:</p>
                <p>
                  {idx === 0
                    ? product.category.name
                    : idx === 1
                    ? `$${product.price}`
                    : idx === 2
                    ? new Date(product.creationAt).toLocaleDateString()
                    : new Date(product.updatedAt).toLocaleDateString()}
                </p>
              </div>
            )
          )}
        </div>
        <DialogFooter>
          {quantity > 0 ? (
            <div className="flex items-center gap-4 w-full">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={onDecrement}
              >
                -
              </Button>
              <span className="text-xl font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={onAddToCart}
              >
                +
              </Button>
            </div>
          ) : (
            <Button className="w-full" size="lg" onClick={onAddToCart}>
              Купить
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCard;
