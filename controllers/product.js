const { Product } = require('../models');

class ProductController {
  static async create(req, res, next) {
    try {
      const { name, imageUrl, price, stock } = req.body;
      const newProduct = { name, imageUrl, price, stock };
      const createdProduct = await Product.create(newProduct);
      return res.status(201).json(createdProduct);
    }
    catch (err) {
      return next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const id = +req.params.id;
      const { name, imageUrl, price, stock } = req.body;   
      const statusUpdate = await Product.update({ name, imageUrl, price, stock }, { where: {id} });
      if(statusUpdate[0] === 1) return res.status(200).json({ id, name, imageUrl, price, stock });      
      return next();
    }
    catch (err) {
      console.log("🚀 ~ file: product.js ~ line 25 ~ ProductController ~ update ~ err", err)
      return next(err);
    }
  }
}

module.exports = ProductController;