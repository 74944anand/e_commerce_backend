const userService = require('../service/user');
const response = require('../utils/response');

exports.getData = async (req, res) => {
    const result = await userService.getData(req.query)
    if (result.success) {
         return response.ok(res, {...result})
     }else {
         return response.noData(res, {...result})
       }
}

exports.getDataById = async (req, res) => {
    const { id } = req.params
    const result = await userService.getDataById(id)
    if (result.success)  { 
        return response.ok(res, {...result})
     } else { 
        return response.noData(res, {...result})
     }
}

exports.addData = async (req, res) => {
    const result = await userService.addData(req.body)
    if (result.success) {
         return response.created(res, {...result})
      }else { 
        return response.badRequest(res, {...result}) 
    }
}

exports.updateDataById = async (req, res) => {
    const { id } = req.params
    const result = await userService.updateDataById(id, req.body)
    if (result.success)  { 
        return response.ok(res, {...result})
     }else {
         return response.noData(res, {...result})
     }
}

exports.deleteDataById = async (req, res) => {
    const { id } = req.params
    const userId= req.decoded?.id;
    const result = await userService.deleteDataById(id,userId)
    if (result.success) { 
        return response.deleted(res, {...result})
     }else {
         return response.noContent(res, {...result})
         }
}


exports.getAllAppliedUsers = async (req, res) => {
    const { limit, page } = req.query;
    const userId= req.decoded?.id;
    const result = await userService.getAllAppliedUsers(userId,{ limit, page })
    if (result.success) {
         return response.ok(res, {...result}) 
        }
    else { 
        return response.noData(res, {...result}) 
    }
}

exports.getAplicantsForJob = async (req, res) => {
    const { limit, page } = req.query;
    const {id}= req.params;
    const userId = req.decoded?.id;
    const result = await userService.getAplicantsForJob(id,userId,{ limit, page })
    if (result.success) {
         return response.ok(res, {...result}) 
        }
    else { 
        return response.noData(res, {...result}) 
    }
}




