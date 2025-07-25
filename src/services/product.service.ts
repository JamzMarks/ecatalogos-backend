import { Prisma, products_gender } from "@prisma/client";
import prisma from "../database/prisma";
import createHttpError from "http-errors";
import { validateIsNumeric } from "../utils/isNumber";
import { buildProductWhere } from "../utils/buildProductWhere.helper";
import { VariantCreateInput } from "../models/dtos/variants.dto";
import { buildVariants } from "../utils/buildVariant.helper";

export class ProductService {
  public getProducts = async (filters = {}) => {
    const where = buildProductWhere(filters);
    const products = await prisma.products.findMany({
      where,
      include: {
        brands: true,
        categories: true,
        subcategories: true,
        variants: {
          include: {
            skus: true,
          },
        },
      },
    });

    if (!products) {
      throw new createHttpError.NotFound("Produtos não encontrados");
    }

    return products;
  };

  public getProductById = async (id: string) => {
    const isValidId = validateIsNumeric(id);
    if (!isValidId) {
      throw new createHttpError.BadRequest("ID inválido");
    }
    const numericId = Number(id);
    const product = await prisma.products.findFirst({
      where: { id: numericId },
      include: {
        brands: true,
        categories: true,
        subcategories: true,
        variants: {
          include: {
            skus: true,
          },
        },
      },
    });
    if (!product) {
      throw new createHttpError.NotFound("Produto não encontrado");
    }
    return product;
  };

  async createProduct(
    data: Prisma.productsCreateInput & {
      variants?: VariantCreateInput[];
    }
  ) {
    const {
      brand_id,
      category_id,
      subcategory_id,
      variants,
      ...productFields
    } = data as any;

    // Validação das chaves estrangeiras
    const brandExists = await prisma.brands.findUnique({
      where: { id: brand_id },
    });
    if (!brandExists) throw new Error(`brand_id ${brand_id} não existe`);

    const categoryExists = await prisma.categories.findUnique({
      where: { id: category_id },
    });
    if (!categoryExists)
      throw new Error(`category_id ${category_id} não existe`);

    if (subcategory_id !== undefined && subcategory_id !== null) {
      const subcategoryExists = await prisma.subcategories.findUnique({
        where: { id: subcategory_id },
      });
      if (!subcategoryExists)
        throw new Error(`subcategory_id ${subcategory_id} não existe`);
    }

    //para company apenas funciona caso tenha company ID para FK
    // const companyExists = await prisma.companies.findUnique({
    //   where: { id: productFields.company_id },
    // });
    // if (!companyExists)
    //   throw new Error(`company_id ${productFields.company_id} não existe`);
    
    return prisma.products.create({
      data: {
        ...productFields,
        brand_id,
        category_id,
        subcategory_id,
        variants: buildVariants(variants),
      },
    });
  }

  public updateProduct = async (
    id: string,
    data: Prisma.productsUpdateInput
  ) => {
    const isValidId = validateIsNumeric(id);
    if (!isValidId) {
      throw new createHttpError.BadRequest("ID inválido");
    }
    const numericId = Number(id);
    try {
      return await prisma.products.update({
        where: { id: numericId },
        data,
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new createHttpError.NotFound("Produto não encontrado");
      }
      throw err;
    }
  };

  public deleteProduct = async (id: string) => {
    const isValidId = validateIsNumeric(id);
    if (!isValidId) {
      throw new createHttpError.BadRequest("ID inválido");
    }
    const numericId = Number(id);
    try {
      return prisma.products.update({
        where: { id: numericId },
        data: { deleted_at: new Date() },
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new createHttpError.NotFound("Produto não encontrado");
      }
      throw err;
    }
  };

  public getDeletedProducts = async () => {
    const products = await prisma.products.findMany({
      where: {
        deleted_at: { not: null },
      },
      include: {
        brands: true,
        categories: true,
        subcategories: true,
        variants: {
          include: {
            skus: true,
          },
        },
      },
    });

    if (!products) {
      throw new createHttpError.NotFound("Produtos deletados não encontrados");
    }

    return products;
  };

  public getDeletedProductsById = async (id: string) => {
    const isValidId = validateIsNumeric(id);
    if (!isValidId) {
      throw new createHttpError.BadRequest("ID inválido");
    }
    const numericId = Number(id);
    const product = await prisma.products.findFirst({
      where: { id: numericId, deleted_at: { not: null } },
      include: {
        brands: true,
        categories: true,
        subcategories: true,
        variants: {
          include: {
            skus: true,
          },
        },
      },
    });
    if (!product) {
      throw new createHttpError.NotFound("Produto deletado não encontrado");
    }
    return product;
  };

  public getProductsCount = async (filters = {}) => {
    const where = buildProductWhere(filters);
    return await prisma.products.count({
      where,
    });
  };

  public async getFilters() {
    const brands = await prisma.products.groupBy({
      by: ["brand_id"],
      _count: { _all: true },
    });

    const brandsDetails = await Promise.all(
      brands.map(async (b) => {
        const brand = await prisma.brands.findUnique({
          where: { id: b.brand_id },
        });
        return {
          id: brand?.id,
          name: brand?.name,
          quantity: b._count._all,
        };
      })
    );

    const types = await prisma.products.groupBy({
      by: ["type"],
      _count: { _all: true },
    });

    const genders = await prisma.products.groupBy({
      by: ["gender"],
      _count: { _all: true },
    });

    const categoriesRaw = await prisma.products.groupBy({
      by: ["category_id"],
      _count: { _all: true },
    });

    const categories = await Promise.all(
      categoriesRaw.map(async (c) => {
        const cat = await prisma.categories.findUnique({
          where: { id: c.category_id },
        });

        const subcategoriesRaw = await prisma.products.groupBy({
          by: ["subcategory_id"],
          where: { category_id: c.category_id },
          _count: { _all: true },
        });

        const subcategories = await Promise.all(
          subcategoriesRaw
            .filter((sc) => sc.subcategory_id !== null)
            .map(async (sc) => {
              const subcat = await prisma.subcategories.findUnique({
                where: { id: sc.subcategory_id! },
              });
              return {
                id: subcat?.id,
                name: subcat?.name,
                quantity: sc._count._all,
              };
            })
        );

        return {
          id: cat?.id,
          name: cat?.name,
          quantity: c._count._all,
          subcategories,
        };
      })
    );
    const promptDeliveryRaw = await prisma.products.groupBy({
      by: ["prompt_delivery"],
      _count: { _all: true },
    });

    const promptDelivery: Record<string, number> = {};
    promptDeliveryRaw.forEach((pd) => {
      promptDelivery[pd.prompt_delivery.toString()] = pd._count._all;
    });

    return {
      brands: brandsDetails,
      types: types.map((t) => ({ name: t.type, quantity: t._count._all })),
      genders: genders.map((g) => ({
        name: g.gender,
        quantity: g._count._all,
      })),
      categories,
      promptDelivery,
    };
  }
}
