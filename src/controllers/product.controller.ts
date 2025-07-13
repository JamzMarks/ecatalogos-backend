import { ProductService } from "../services/product.service";
import { Request, Response } from "express";

export class ProductController {
  private productService = new ProductService();

  public getProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getProducts();
      res.json(products);
    } catch (err: unknown) {
      res.status(500).json({ error: (err as Error).message });
    }
  };
}
