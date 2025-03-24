"use client";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { sortByAtom, categoryFilterAtom, categoriesAtom } from "../lib/atoms";
import { cartAtom } from "../lib/atoms";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Catalog from "./components/Catalog";
import Link from "next/link";

export default function Home() {
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [category, setCategoryFilter] = useAtom(categoryFilterAtom);

  const categories = useAtomValue(categoriesAtom);
  const cart = useAtomValue(cartAtom);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="z-50 fixed bg-white w-full h-[80px] flex items-center p-5 md:p-10 border-b-2 border-black justify-between">
        <h1 className="text-[20px] md:text-[32px] font-bold">Каталог</h1>

        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:flex hidden">
              <Button variant="outline">
                {sortBy === "price_asc"
                  ? "По возрастанию цены"
                  : sortBy === "price_desc"
                  ? "По убыванию цены"
                  : sortBy === "date_new"
                  ? "Новые сначала"
                  : sortBy === "date_old"
                  ? "Старые сначала"
                  : "Сортировать по"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("price_asc")}>
                По возрастанию цены
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("price_desc")}>
                По убыванию цены
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("date_new")}>
                Новые сначала
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("date_old")}>
                Старые сначала
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy(null)}>
                Сбросить сортировку
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:flex hidden">
              <Button variant="outline">
                {category?.name || "Все категории"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                Все категории
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger asChild className="md:hidden flex">
              <Button variant={"outline"}>Фильтры</Button>
            </SheetTrigger>
            <SheetContent className="p-5">
              <SheetHeader>
                <SheetTitle>Фильтры</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {sortBy === "price_asc"
                      ? "По возрастанию цены"
                      : sortBy === "price_desc"
                      ? "По убыванию цены"
                      : sortBy === "date_new"
                      ? "Новые сначала"
                      : sortBy === "date_old"
                      ? "Старые сначала"
                      : "Сортировать по"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("price_asc")}>
                    По возрастанию цены
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price_desc")}>
                    По убыванию цены
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("date_new")}>
                    Новые сначала
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("date_old")}>
                    Старые сначала
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy(null)}>
                    Сбросить сортировку
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {category?.name || "Все категории"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                    Все категории
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SheetContent>
          </Sheet>
          <Link href="/cart" className="relative">
            <Button variant="outline" className="bg-blue-400">
              Корзина
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
      <div className="h-[80px]"></div>
      <Catalog />
    </div>
  );
}
