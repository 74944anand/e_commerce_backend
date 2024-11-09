// controllers/orderController.js
const orderService = require('../service/order');

exports.createOrder = async (req, res) => {
  const userId=req.decoded?.id;
  const { amount } = req.body;
    const { success, order, razorpayOrder, error } = await orderService.createOrder(amount,userId);
    if (!success) return res.status(500).json({ success: false, error });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.totalAmount,
      currency: razorpayOrder.currency,
      razorpayOrder,
    });
};

exports.verifyOrder = async (req, res) => {
   const { razorpay_order_id, razorpay_payment_id } = req.body;

    const { success, transaction, message } = await orderService.verifyPaymentService(razorpay_order_id, razorpay_payment_id);
    if (!success) return res.status(500).json({ success: false, data:null, message });

    res.status(200).json({
      success: true,
      message,
      transaction,
    });
};

exports.getOrders = async(req,res)=>{
  const userId=req.decoded?.id;
  const {success, orders, message} = await orderService.getOrderDeatils(userId)
  if (!success) return res.status(404).json({ success: false, data:null, message });

  res.status(200).json({
    success: true,
    message,
    orders,
  });

}

exports.getUserTransaction = async(req,res)=>{
  const userId=req.decoded?.id;
  const {success, transactions, count, message} = await orderService.getUserTransaction(userId)
  if (!success) return res.status(404).json({ success: false, data:null, message });

  res.status(200).json({
    success: true,
    message,
    transactions,
    count
  });

}

