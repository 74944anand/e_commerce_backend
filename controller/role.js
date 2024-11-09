const roleService = require('../service/role');
const response = require('../utils/response');

exports.getData = async (req, res) => {
    const { limit, page } = req.query;
    const result = await roleService.getData({ limit, page })
    if (result.success) {
         return response.ok(res, {...result}) 
        }
    else { 
        return response.noData(res, {...result}) 
    }
}

exports.getDataById = async (req, res) => {
    const { id } = req.params
    const result = await roleService.getDataById(id)
    if (result.success)  { 
        return response.ok(res, {...result}) 
    }
    else { 
        return response.noData(res, {...result}) 
    }
}

exports.addData = async (req, res) => {
    const result = await roleService.addData(req.body)
    if (result.success) { 
        return response.created(res, {...result})
     }
    else { 
        return response.badRequest(res, {...result})
     }
}

exports.updateDataById = async (req, res) => {
    const { id } = req.params
    const result = await roleService.updateDataById(id, req.body)
    if (result.success)  { 
        return response.ok(res, {...result}) 
    }
    else { 
        return response.noData(res, {...result}) 
    }
}

exports.deleteDataById = async (req, res) => {
    const { id } = req.params
    const result = await roleService.deleteDataById(id)
    if (result.success) { 
        return response.deleted(res, {...result})
     }
    else { 
        return response.noContent(res, {...result})
     }
}
