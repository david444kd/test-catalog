"use client";
import React, { useState, useEffect } from "react";
import getProducts from "../api/getProduct";
import { Product, Category } from "../types";
import { Input } from "@/components/ui/input";
import { useAtom } from "jotai";
import { cartAtom } from "../../lib/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import {
  sortByAtom,
  categoryFilterAtom,
  categoriesAtom,
} from "../../lib/atoms";
import { useDebounce } from "use-debounce";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("./ProductCard"), {
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />,
  ssr: false,
});

const Catalog = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const sortBy = useAtomValue(sortByAtom);
  const categoryFilter = useAtomValue(categoryFilterAtom);
  const setCategories = useSetAtom(categoriesAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      return existing
        ? prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { product, quantity: 1 }];
    });
  };

  const handleDecrement = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getQuantity = (productId: number) =>
    cart.find((item) => item.product.id === productId)?.quantity || 0;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);

        const uniqueCategories = data.reduce(
          (acc: Category[], product: any) => {
            if (!acc.some((c) => c.id === product.category.id)) {
              acc.push(product.category);
            }
            return acc;
          },
          []
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [setCategories]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "date_new")
      return (
        new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
      );
    if (sortBy === "date_old")
      return (
        new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime()
      );
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) => {
    const matchesCategory =
      !categoryFilter || product.category.id === categoryFilter.id;
    const search = debouncedSearchQuery.toLowerCase();
    return (
      matchesCategory &&
      (product.title.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.category.name.toLowerCase().includes(search))
    );
  });

  if (loading) return <div className="w-full text-center p-8">Загрузка...</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Поиск по названию, описанию или категории..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
          disabled={loading}
        />

        {!loading && filteredProducts.length === 0 && (
          <p className="text-gray-500">
            Товары не найдены. Попробуйте изменить параметры поиска.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={getQuantity(product.id)}
            onAddToCart={() => handleAddToCart(product)}
            onDecrement={() => handleDecrement(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
