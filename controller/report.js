const reportService = require('../service/report');
const response = require('../utils/response');

exports.getReport = async (req, res) => {
    const result = await reportService.getReport(req.query)
    if (result.success) {
         return response.ok(res, {...result})
     }else {
         return response.noData(res, {...result})
       }
}