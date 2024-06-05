import CategoryModel from "../../model/product/category.js";
import ProductModel from "../../model/product/index.js";

const ProductController = {
  getAll: async (req, res) => {
    try {
      const products = await ProductModel.findAll({
        include: [{ model: CategoryModel, attributes: ["name"] }],
      });

      res.json({
        data: products,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await ProductModel.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "No product with this name" });
      }
      res.status(200).json({ data: product });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    try {
      const payload = req.body;

      console.log(payload, "payload");

      const product = new ProductModel();
      product.name = payload.name;
      product.price = payload.price;
      product.stock = payload.stock;
      await product.save();

      await product.addCategories(payload.categories);

      res.status(200).json({ message: "Product created", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const product = await ProductModel.findByPk(id);
      if (!product) {
        res.status(404).json({ message: "product not found" });
      }
      if (payload.name) {
        product.name = payload.firstName
      }

      if (product.price) {
        product.price = payload.price;
      }
      if (product.stock) {
        product.stock = payload.stock;
      }

      await product.save();



      console.log("updatedData is ", payload);
      res.status(200).json({ message: "product updated", data: product });


    }

    catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },


  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await ProductModel.findByPk(id);
      if (!product) {
        res.status(404).json({ message: "product not found" });
      }

      await product.destroy();


      console.log(`product with id ${id} is deleted `);
      res.status(200).json({ message: `product with id ${id} is deleted `, product });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }

  }
};

export default ProductController;
