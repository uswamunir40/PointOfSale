import sequelize from "./config.js";
import userModel from "../model/users/index.js";
import tokenModel from "../model/auth/token.js";
import CategoryModel from "../model/product/category.js";
import ProductModel from "../model/product/index.js";
import SalesModel from "../model/sales/index.js";
import SaleProductModel from "../model/sales/salesProducts.js";




const syncDb = async () => {
    await sequelize.sync({ alter: true, force: false });
    await userModel.sync({ alter: true, force: false });
    await tokenModel.sync({ alter: true, force: false });
    await CategoryModel.sync({ alter: true, force: false });
    await ProductModel.sync({ alter: true, force: false });
    await SalesModel.sync({ alter: true, force: false });
    await SaleProductModel.sync({ alter: true, force: false });

    console.log("Models created");
}

export default syncDb;