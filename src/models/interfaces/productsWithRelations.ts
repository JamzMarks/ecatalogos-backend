import { Prisma } from "@prisma/client";

export type ProductWithRelations = Prisma.productsGetPayload<{
  include: {
    brands: true,
    categories: true,
    subcategories: true,
    variants: {
      include: {
        skus: true;
      };
    };
  };
}>;