import SalesModel from "../../model/sales/index.js";
import SaleProductModel from "../../model/sales/salesProducts.js";
import ProductModel from "../../model/product/index.js";
import sequelize from "../../db/config.js";


const salesController = {

  getAll: async (req, res) => {
    try {
      const sales = await SalesModel.findAll({
        order: [["createdAt", "DESC"]],
        limit: 5
      });
      res.status(200).json({ message: "Sales are: ", sales });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getSingle: async (req, res) => {

    try {
      const { id } = req.params;

      const sale = await SalesModel.findByPk(id, {
        include: [{
          model: SaleProductModel,
          attributes: ['productQuantity'],
          include: [{
            model: ProductModel,
            attributes: ['name']
          }]
        }]
      });

      if (!sale) {
        return res.status(404).json({ message: `Sale not found of this ${id} id.` })
      }
      res.status(200).json({ message: "Sales are: ", sale });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }

  },
  getSingleSaleProduct: async (req, res) => {

    try {
      const { id } = req.params;

      const sale = await SaleProductModel.findByPk(id, {
        include: [ProductModel]
      })
      if (!sale) {
        return res.status(404).json({ message: `Sale not found of this ${id} id.` })
      }
      res.status(200).json({ message: "Sales are: ", sale });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }

  },

  createSales: async (req, res) => {
    let transactionStatus = "rolled back";
    try {
      await sequelize.transaction(async (transaction) => {
        const payload = req.body;
        const sale = await SalesModel.create({ totalAmount: 0 }, { transaction });

        const salesProduct = [];
        console.log("request", payload);

        for (let index = 0; index < payload.salesProducts.length; index++) {
          const ele = payload.salesProducts[index];

          const product = await ProductModel.findByPk(ele.ProductId, { transaction });
          if (!product) {
            throw new Error("Product not found");

          }

          if (ele.productQuantity > product.stock) {
            throw new Error("The product " + product.name + " has insufficient stock");
          }

          salesProduct.push({
            ...ele,
            price: product.price,
            SaleId: sale.id,
          });

          console.log("Element is ", ele);
        }

        await SaleProductModel.bulkCreate(salesProduct, { transaction });

        const totalAmount = salesProduct.reduce((sum, current) => {
          return sum + (current.price * current.productQuantity);
        }, 0);

        sale.totalAmount = totalAmount;
        await sale.save({ transaction });

        for (const sp of salesProduct) {
          const product = await ProductModel.findByPk(sp.ProductId, { transaction });
          product.stock -= sp.productQuantity;
          await product.save({ transaction });
          transactionStatus = "completed";

        }

        res.status(200).json({ message: "Sale created", sale, transactionStatus });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message || "Internal server error", transactionStatus });


    }

  }
}

export default salesController;
