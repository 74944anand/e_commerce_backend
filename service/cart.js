const { include } = require("underscore");
const db = require("../models");
const pagination = require("../utils/pagination");
const cartItem = require("../models/cartItem");

exports.getData = async (query, userId) => {
  const { search, offset, pageSize } = pagination.paginationWithFromTo(
    query.search,
    query.page,
    query.limit
  );
  const result = await db.cart.findAll({
    offset: offset,
    limit: pageSize,
    where: { userId },
    include: [{ model: db.cartItem, as: "items", include:[{ model: db.product, as:"product"}] }],
    order: [["updatedAt", "DESC"]],
  });

  if (result && result.length) {
    let totalAmount = 0;
    result[0].items.map((item=>{
      totalAmount += item.product.price * item.quantity
    }))
    let count = await db.cartItem.count({ where: { cartId:result[0].id } });
    return { success: true, message: "Cart Found", data: result, count, totalAmount };
  } else {
    return { success: false, message: "Cart Not Found", data: result };
  }
};

exports.getDataById = async (id) => {
  const result = await db.cart.findOne({
    where: { id },
  });
  if (result) {
    return { success: true, message: "Cart Updated", data: result };
  } else {
    return { success: false, message: "Cart Not Found", data: result };
  }
};

exports.addData = async (userId, items) => {
  let cart;
  const checkIfCart = await db.cart.findAll({ where: { userId } });
  if (checkIfCart.length == 0) {
    cart = await db.cart.create({ userId });
  } else {
    cart = checkIfCart[0];
  }
  const cartItems = items.map((item) => ({
    cartId: cart.id,
    productId: item.productId,
    quantity: item.quantity,
  }));
  const result = await db.cartItem.bulkCreate(cartItems);
  if (result) {
    return { success: true, message: "Cart Added", data: result };
  } else {
    return { success: false, message: "Cart Not Added", data: result };
  }
};

exports.updateDataById = async (userId, items) => {
  try {
    let cart;
    const checkIfCart = await db.cart.findOne({ where: { userId } });
    if (checkIfCart.length == 0) {
      cart = await db.cart.create({ userId });
    } else {
      cart = checkIfCart;
    }
    console.log("cartId",cart);
    
    const existingCartItems = await db.cartItem.findAll({
      where: { cartId: cart.id },
      raw: true, // To get raw data
    });

    const existingItemsMap = {};
    existingCartItems.forEach((item) => {
      existingItemsMap[item.productId] = item;
    });

    for (const item of items) {
      if (existingItemsMap[item.productId]) {
        await db.cartItem.update(
          { quantity: item.quantity },
          { where: { cartId:cart.id, productId: item.productId } }
        );
      } else {
        await db.cartItem.create({
          cartId:cart.id,
          productId: item.productId,
          quantity: item.quantity,
        });
      }
    }

    return { success: true, message: "Cart updated successfully" };
  } catch (error) {
    console.error("Error updating cart:", error);
    return { success: false, message: "Error updating cart" };
  }
};

exports.deleteCart = async (userId) => {
    const checkIfCart = await db.cart.findAll({ where: { userId } });
if (checkIfCart.length == 0) {
    return { success: false, message: "Cart Not found" };
}
  const checkDelete = await db.cartItem.destroy({ where: { cartId: checkIfCart.id } });
  if (!checkDelete) {
    return { success: false, message: "Cart Not Deleted" };
  }
  const result = await db.cart.destroy({ where: { cartId } });
  if (result) {
    return { success: true, message: "Cart Deleted" };
  } else {
    return { success: false, message: "Cart Not found" };
  }
};

exports.deleteCartItem = async (userId,productId) => {
const checkIfCart = await db.cart.findOne({ where: { userId } });
if (checkIfCart.length == 0) {
    return { success: false, message: "Cart Not found" };
}
  const result = await db.cartItem.destroy({ where: { cartId:checkIfCart.id, productId } });
  if (result) {
    return { success: true, message: "Cart Item Deleted" };
  } else {
    return { success: false, message: "Cart Item Not found" };
  }
};

exports.getCartItems = async(userId)=>{
  const cart = await db.cart.findOne({where:{userId}})
  
  const cartItems = await db.cartItem.findAll({
    where:{cartId:cart.id},include:[{ model: db.product, as:"product"}]
  })
  
  return{
    cartId:cart.id,cartItems
  }
}
