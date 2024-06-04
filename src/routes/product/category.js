import { Router } from "express";
import categoryController from "../../controller/product/category.js";
import validateSchema from "../../validators/product/index.js";
import authenticateMiddleware from "../../middleware/auth.js";

const categoryRouter = Router();
categoryRouter.get("/categories", categoryController.getAll);
categoryRouter.post("/category", authenticateMiddleware, validateSchema.category, categoryController.create);
categoryRouter.get("/category/:id", categoryController.getSingle);

export default categoryRouter;
