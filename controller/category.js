const categoryService = require('../service/category');
const response = require('../utils/response');

exports.getCategory = async (req, res) => {
    const { limit, page } = req.query;
    const result = await categoryService.getData({ limit, page })
    if (result.success) {
         return response.ok(res, {...result}) 
        }
    else { 
        return response.noData(res, {...result})
    }
}


exports.getCategoryById = async (req, res) => {
    const { id } = req.params
    const result = await categoryService.getDataById(id)
    if (result.success)  { 
        return response.ok(res, {...result}) 
    }
    else { 
        return response.noData(res, {...result}) 
    }
}

exports.addCategory = async (req, res) => {
    const userId=req.decoded?.id;
    const result = await categoryService.addData(userId,req.body)
    if (result.success) { 
        return response.created(res, {...result})
     }
    else { 
        return response.badRequest(res, {...result})
     }
}

exports.updateCategoryById = async (req, res) => {
    const { id } = req.params
    const result = await categoryService.updateDataById(id, req.body)
    if (result.success)  { 
        return response.ok(res, {...result}) 
    }
    else { 
        return response.noData(res, {...result}) 
    }
}

exports.deleteCategoryById = async (req, res) => {
    const { id } = req.params
    const result = await categoryService.deleteDataById(id)
    if (result.success) { 
        return response.deleted(res, {...result})
     }
    else { 
        return response.noContent(res, {...result})
     }
}
