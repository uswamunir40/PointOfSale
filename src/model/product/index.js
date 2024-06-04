import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import CategoryModel from "./category.js";
import SaleProductModel from "../sales/salesProducts.js";

const ProductModel = sequelize.define("Product", {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
ProductModel.belongsToMany(CategoryModel, { through: "categoryProducts" });
CategoryModel.belongsToMany(ProductModel, { through: "categoryProducts" });
ProductModel.hasMany(SaleProductModel);
SaleProductModel.belongsTo(ProductModel);
export default ProductModel;


