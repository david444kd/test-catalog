import { atom } from "jotai";
import { CartItem, Category } from "../app/types";

export const sortByAtom = atom<
  "price_asc" | "price_desc" | "date_new" | "date_old" | null
>(null);

export const categoryFilterAtom = atom<Category | null>(null);
export const categoriesAtom = atom<Category[]>([]);
export const cartAtom = atom<CartItem[]>([]);
