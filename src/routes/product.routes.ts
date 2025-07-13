import { Router } from "express";
import { ProductController } from "../controllers/product.controller";


const router = Router();
const productController = new ProductController();

router.get("/products", (req, res) => productController.getProducts(req, res));
// router.get("/products/:id", (req, res) => controller.getById(req, res));
// router.post("/products", (req, res) => controller.create(req, res));
// router.put("/products/:id", (req, res) => controller.update(req, res));
// router.delete("/products/:id", (req, res) => controller.softDelete(req, res));

export default router;
