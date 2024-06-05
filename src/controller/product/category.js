import CategoryModel from "../../model/product/category.js";

const categoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await CategoryModel.findAll({});

      res.json({
        data: categories,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await CategoryModel.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "No category with this name" });
      }
      res.status(200).json({ data: category });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    try {
      const payload = req.body;
      console.log(payload, "payload");
      const category = new CategoryModel();
      category.name = payload.name;
      await category.save();
      res.status(200).json({ message: "category created", category });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const category = await CategoryModel.findByPk(id);
      if (!category) {
        res.status(404).json({ message: "category not found" });
      }
      if (payload.name) {
        category.name = payload.firstName
      }

      if (category.price) {
        category.price = payload.price;
      }
      if (category.stock) {
        category.stock = payload.stock;
      }

      await category.save();



      console.log("updatedData is ", payload);
      res.status(200).json({ message: "category updated", data: category });


    }

    catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },


  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await CategoryModel.findByPk(id);
      if (!category) {
        res.status(404).json({ message: "category not found" });
      }

      await category.destroy();


      console.log(`category with id ${id} is deleted `);
      res.status(200).json({ message: `category with id ${id} is deleted `, category });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }

  }
};

export default categoryController;
