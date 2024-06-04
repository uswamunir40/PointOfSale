import { Router } from "express";
import ProductController from "../../controller/product/index.js";
import validateSchema from "../../validators/product/index.js";
import authenticateMiddleware from "../../middleware/auth.js";

const productRouter = Router();
productRouter.get("/products", ProductController.getAll);

productRouter.post("/product", authenticateMiddleware, validateSchema.product, ProductController.create);

productRouter.get("/product/:id", ProductController.getSingle);

export default productRouter;
