const cartService = require('../service/cart');
const response = require('../utils/response');

exports.getCart = async (req, res) => {
    const { limit, page } = req.query;
    const userId=req.decoded?.id;
    const result = await cartService.getData({ limit, page },userId)
    if (result.success) {
         return response.ok(res, {...result}) 
        }
    else { 
        return response.noData(res, {...result})
    }
}


exports.addToCart = async (req, res) => {
    const userId=req.decoded?.id;
    const {items} = req.body;
    const result = await cartService.addData(userId,items)
    if (result.success) { 
        return response.created(res, {...result})
     }
    else { 
        return response.badRequest(res, {...result})
     }
}

exports.updateCartById = async (req, res) => {
    const userId=req.decoded?.id;
    const result = await cartService.updateDataById(userId, req.body.items)
    if (result.success)  { 
        return response.ok(res, {...result}) 
    }
    else { 
        return response.noData(res, {...result}) 
    }
}

exports.deleteCart = async (req, res) => {
    const userId=req.decoded?.id;
    const result = await cartService.deleteCart(userId)
    if (result.success) { 
        return response.deleted(res, {...result})
     }
    else { 
        return response.noContent(res, {...result})
     }
}

exports.deleteCartItem = async (req, res) => {
    const { productId } = req.params
    const userId=req.decoded?.id;
    const result = await cartService.deleteCartItem(userId,productId)
    if (result.success) { 
        return response.deleted(res, {...result})
     }
    else { 
        return response.noContent(res, {...result})
     }
}
