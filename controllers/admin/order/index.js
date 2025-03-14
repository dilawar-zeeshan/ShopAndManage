import Order from "../../../models/shared_models/order.js";

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);
    //console.log({ productId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
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

export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      products, // Array of { product: ObjectId, quantity: Number }
      customerName, // String
      phone, // String
      city, // String
      landMark, // String
      address, // String
      orderStatus,
    } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        products, // Array of { product: ObjectId, quantity: Number }
        customerName, // String
        phone, // String
        city, // String
        landMark, // String
        address, // String
        orderStatus,
      },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
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
