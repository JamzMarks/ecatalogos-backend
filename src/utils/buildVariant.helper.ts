import { VariantCreateInput } from "../models/dtos/variants.dto";

export function buildVariants(variants?: VariantCreateInput[]) {
  if (!variants || variants.length === 0) return undefined;

  return {
    create: variants.map(variant => ({
      name: variant.name,
      hex_code: variant.hex_code,
      skus: variant.skus && variant.skus.create && variant.skus.create.length > 0
        ? {
            create: variant.skus.create.map(sku => ({
              size: sku.size,
              stock: sku.stock,
              price: sku.price,
              code: sku.code,
              min_quantity: sku.min_quantity,
              multiple_quantity: sku.multiple_quantity,
              erpId: sku.erpId,
              cest: sku.cest,
              height: sku.height,
              length: sku.length,
              ncm: sku.ncm,
              weight: sku.weight,
              width: sku.width,
            }))
          }
        : undefined,
    }))
  };
}
