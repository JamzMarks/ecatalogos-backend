import type { Prisma } from '@prisma/client';

export type SkuCreateInput = Prisma.skusCreateWithoutVariantsInput;
export type VariantCreateInput = Prisma.variantsCreateWithoutProductsInput & {
  skus?: { create?: SkuCreateInput[] }
};