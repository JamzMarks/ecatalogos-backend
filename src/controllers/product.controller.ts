import { products } from "./../../node_modules/.prisma/client/index.d";
import { ProductService } from "../services/product.service";
import { NextFunction, Request, Response } from "express";

export class ProductController {
  private productService = new ProductService();

  //Products CRUD
  public getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const products = await this.productService.getProducts();
      res.json(products);
    } catch (err: unknown) {
      next(err);
    }
  };

  public getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const productId = req.params.id;
    try {
      const product = await this.productService.getProductById(productId);
      res.json(product);
    } catch (err: unknown) {
      next(err);
    }
  };

  public updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const productId = req.params.id;
    const product = req.body;
    try {
      const product = await this.productService.getProductById(productId);
      res.json(product);
    } catch (err: unknown) {
      next(err);
    }
  };

  public createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const productId = req.params.id;
    const product = req.body;
    try {
      const product = await this.productService.getProductById(productId);
      res.json(product);
    } catch (err: unknown) {
      next(err);
    }
  };

  public softDelete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const productId = req.params.id;
    try {
      const product = await this.productService.getProductById(productId);
      res.json(product);
    } catch (err: unknown) {
      next(err);
    }
  };

  //Deleted Products
  public getDeleteProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const products = await this.productService.getProducts();
      res.json(products);
    } catch (err: unknown) {
      next(err);
    }
  };

  public getDeletedProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const productId = req.params.id;
    try {
      const product = await this.productService.getProductById(productId);
      res.json(product);
    } catch (err: unknown) {
      next(err);
    }
  };
}
