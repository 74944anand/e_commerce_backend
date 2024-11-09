const productService = require('../service/product');
const response = require('../utils/response');

exports.getProductByCategoryId = async (req, res) => {
    const { limit, page, categoryId } = req.query;
    const result = await productService.getData({ limit, page },categoryId)
    if (result.success) {
         return response.ok(res, {...result}) 
        }
    else { 
        return response.noData(res, {...result})
    }
}


exports.getProductById = async (req, res) => {
    const { id } = req.params
    const result = await productService.getDataById(id)
    if (result.success)  { 
        return response.ok(res, {...result}) 
    }
    else { 
        return response.noData(res, {...result}) 
    }
}

exports.addProduct = async (req, res) => {
    const userId=req.decoded?.id;
    const result = await productService.addData(userId,req.body)
    if (result.success) { 
        return response.created(res, {...result})
     }
    else { 
        return response.badRequest(res, {...result})
     }
}

exports.updateProductById = async (req, res) => {
    const { id } = req.params
    const result = await productService.updateDataById(id, req.body)
    if (result.success)  { 
        return response.ok(res, {...result}) 
    }
    else { 
        return response.noData(res, {...result}) 
    }
}

exports.deleteProductById = async (req, res) => {
    const { id } = req.params
    const result = await productService.deleteDataById(id)
    if (result.success) { 
        return response.deleted(res, {...result})
     }
    else { 
        return response.noContent(res, {...result})
     }
}
