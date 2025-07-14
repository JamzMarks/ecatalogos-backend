import { Router } from "express";
import { ProductController } from "../controllers/product.controller";


const router = Router();
const productController = new ProductController();

router.get("/products", productController.getProducts);

//Filter Route
router.get("/products/filters", productController.getFilters);

//Count Product with filter route
router.get("/products/count", productController.getProductsCount);

//Products CRUD routes
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.patch("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.softDelete);

//Soft delete routes
router.get("/products/deleted", productController.getProductById);
router.get("/products/deleted/:id", productController.getProductById);

export default router;
