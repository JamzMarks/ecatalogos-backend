
import { Prisma } from "@prisma/client";
export function buildProductWhere(filters: any): any {
  const where: Prisma.productsWhereInput = {
    deleted_at: null,
  };
  if (filters.type && typeof filters.type === "string") {
    where.type = filters.type.toUpperCase() as Prisma.productsWhereInput["type"];
  }

  if (filters.gender && typeof filters.gender === "string") {
    where.gender = filters.gender.toUpperCase() as Prisma.productsWhereInput["gender"];
  }

  if (filters.brand_id) {
    where.brand_id = Number(filters.brand_id);
  }

  if (filters.category_id) {
    where.category_id = Number(filters.category_id);
  }

  if (filters.subcategory_id) {
    where.subcategory_id = Number(filters.subcategory_id);
  }

  if (filters.prompt_delivery !== undefined) {
    where.prompt_delivery = filters.prompt_delivery === "true";
  }

  return where;
}
