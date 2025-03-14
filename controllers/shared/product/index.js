import Product from "../../../models/shared_models/product.js";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
