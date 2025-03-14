import Order from "../../../models/shared_models/order.js";

export const createOrder = async (req, res) => {
  try {
    const {
      products, // Array of { product: ObjectId, quantity: Number }
      customerName, // String
      phone, // String
      city, // String
      landMark, // String
      address, // String
      orderStatus, // Optional, will default to "Not Processed" if not provided
    } = req.body;
    const newOrder = await Order.create({
      products,
      customerName,
      phone,
      city,
      landMark,
      address,
      orderStatus: orderStatus || "Not Processed", // Use provided orderStatus or default
    });
    newOrder.statusId = newOrder._id.toString().slice(-6);

    // Save order with statusId
    await newOrder.save();
    // Return a success response with the new order
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getOrderStatus = async (req, res) => {
  try {
    const { statusId } = req.params;

    if (!statusId) {
      return res
        .status(400)
        .json({ success: false, message: "Status ID is required" });
    }

    // Find the order by matching the last 6 characters of _id
    const order = await Order.findOne({
      statusId: String(req.params.statusId),
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      orderStatus: order.orderStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
