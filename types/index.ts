import { z } from "zod";
import { insertProductsScheuma } from "@/lib/validator";

export type Product = z.infer<typeof insertProductsScheuma> & {
  id: string;
  rating: string;
  createdAt: Date;
};
