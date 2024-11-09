
const { where } = require('underscore');
const razorpayInstance = require('../config/razorpayConfig');
const db = require('../models'); // Sequelize models
const { getCartItems } = require('./cart');

exports.createOrder = async (amount, userId) => {

  const {cartItems,cartId} = await getCartItems(userId);

  const razorpayOrder = await razorpayInstance.orders.create({
    amount: amount * 100,
    currency: 'INR',
  });

  const newOrder = await db.order.create({
    userId,
    totalAmount:amount,
    razorpayOrderId: razorpayOrder.id,
    status: 'pending',
  });

  for (const item of cartItems) {
    await db.orderItem.create({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      priceAtTime: item.product.price,
    });
  }

  await db.cartItem.destroy({ where: { cartId } });


  return { success:true,order: newOrder, razorpayOrder: razorpayOrder };
};

exports.verifyPaymentService = async (razorpayOrderId, razorpayPaymentId) => {
  const order = await db.order.findOne({where: { razorpayOrderId,status:"pending"}});
  if(!order){
    return {success:false,message:"Order not found"};
  }
  await db.order.update(
    { status: 'paid', paymentStatus: 'completed' },
    { where: { razorpayOrderId } }
  );
  const transaction = await db.transaction.create({
    orderId: razorpayOrderId,
    paymentId:razorpayPaymentId,
    amount: order.totalAmount,
    status: 'completed',
  });

  return {success:true,
    transaction,
  }
};


exports.getOrderDeatils = async(userId)=>{

    const order = await db.order.findOne({where:{userId}});
    if(!order){
      return {success:false,message:"No orders found"};
    }
    const orderItems = await db.orderItem.findAll({
      where: { orderId: order.id },
      order: [['updatedAt', 'DESC']]  
    });
    
    if(!orderItems){
      return {success:false,message:"No order items found"};
    }
    return {success:true, message:"Order data found", orders:orderItems}

}


exports.getUserTransaction = async(userId) =>{
  const query = `
  SELECT o.*, t.* from orders as o INNER JOIN transaction as t ON o."razorpayOrderId" = t."orderId" where o."userId" = ${userId} order by t."updatedAt" DESC ;
  `
  const transactions = await db.sequelize.query(query, { type: db.sequelize.Query});

  if(!transactions){
    return {success:false,message:"No transactions found"};
  }
  return {success:true, message:"Order data found", transactions:transactions[0], count:transactions[0].length}
}