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
      const products = await this.productService.getProducts(req.query);
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
    const productData = req.body;
    try {
      const product = await this.productService.updateProduct(productId, productData);
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
    const productData = req.body;
    try {
      const product = await this.productService.createProduct(productData);
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
      const product = await this.productService.deleteProduct(productId);
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
      const products = await this.productService.getDeletedProducts();
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
      const product = await this.productService.getDeletedProductsById(productId);
      res.json(product);
    } catch (err: unknown) {
      next(err);
    }
  };

  public getFilters = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filters = await this.productService.getFilters();
      res.json(filters);
    } catch (err) {
      next(err);
    }
  };

  public getProductsCount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // const filters= req.body.filters;
    try {
      const productsCount = await this.productService.getProductsCount(req.query);
      res.json(productsCount);
    } catch (err) {
      next(err);
    }
  };
}
