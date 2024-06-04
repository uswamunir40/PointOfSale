import { Router } from "express";
import salesController from "../../controller/sales/index.js";
const salesRouter = Router();
salesRouter.get("/sales", salesController.getAll);
salesRouter.get("/sale/:id", salesController.getSingle);
salesRouter.post("/sale", salesController.createSales);
salesRouter.get("/saleProduct/:id", salesController.getSingleSaleProduct);
export default salesRouter;