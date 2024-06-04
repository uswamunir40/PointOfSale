import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SalesModel from "./index.js";

const SaleProductModel = sequelize.define(
  "SaleProduct",
  {
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
    
  },
  {}
);

SalesModel.hasMany(SaleProductModel);
SaleProductModel.belongsTo(SalesModel);

export default SaleProductModel;
