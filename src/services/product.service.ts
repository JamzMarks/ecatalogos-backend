import prisma from "../database/prisma";

export class ProductService {
  public getProducts = async (filters = {}) => {
    return prisma.products.findMany({
      where: filters,
      include: {
        brands: true,
        categories: true,
        subcategories: true,
        variants: true,
      },
    });
  };

//   public getProductById = async (id: string) => {
//     return prisma.products.findUnique({
//       where: { id: parseInt(id) },
//       include: {
//         brands: true,
//         categories: true,
//         subcategories: true,
//         variants: true,
//       },
//     });
//   };

//   public createProduct = async (data) => {
//     return prisma.products.create({
//       data,
//     });
//   };

//   public updateProduct = async (id: string, data) => {
//     return prisma.products.update({
//       where: { id },
//       data,
//     });
//   };

//   public deleteProduct = async (id) => {
//     return prisma.products.update({
//       where: { id: parseInt(id) },
//       data: { deleted_at: new Date() }, // Soft delete
//     });
//   };
}
