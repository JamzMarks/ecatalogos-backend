import { Prisma } from "@prisma/client";
import prisma from "../database/prisma";
import createHttpError from "http-errors";
import { validateIsNumeric } from "../utils/isNumber";

export class ProductService {
  public getProducts = async (filters = {}) => {
    const products = await prisma.products.findMany({
      where: {
        deleted_at: null,
        // qualquer outro filtro seu...
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
        // companies: true,
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
    console.log(product);
    if (!product) {
      throw new createHttpError.NotFound("Produto não encontrado");
    }
    return product;
  };

  async createProduct(data: Prisma.productsCreateInput) {
    // return prisma.products.create({
    //   data: {
    //     ...data,
    //     variants: {
    //       create: data.variants.map(variant => ({
    //         name: variant.name,
    //         hex_code: variant.hex_code,
    //         skus: {
    //           create: variant.skus,
    //         },
    //       })),
    //     },
    //   },
    // });
  }

  // public updateProduct = async (id: string, data) => {
  //   return prisma.products.update({
  //     where: { id: parseInt(id) },
  //     data,
  //   });
  // };

  // public deleteProduct = async (id) => {
  //   return prisma.products.update({
  //     where: { id: parseInt(id) },
  //     data: { deleted_at: new Date() }, // Soft delete
  //   });
  // };
}
