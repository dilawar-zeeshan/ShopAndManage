import Product from "../../../models/shared_models/product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, image } = req.body;
    const product = await Product.findOne({ name: name });
    if (product) {
      return res.status(422).json({
        success: false,
        message: "Product with same name already exists",
      });
    }
    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
      image,
    });
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    //console.log({ productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, quantity, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, quantity, image },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
