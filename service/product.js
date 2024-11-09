const db = require('../models');
const pagination = require('../utils/pagination');

exports.getData = async (query,categoryId) => {
    const { search, offset, pageSize } = pagination.paginationWithFromTo(
        query.search,
        query.page,
        query.limit
    ); 
    const result = await db.product.findAll({
        offset: offset,
        limit: pageSize,
        where: {categoryId},
        include:[
            {
                model: db.user,
                as: "user",
                attributes: ["id", "firstName", "email"],
            }
        ] ,
        order: [['updatedAt', 'DESC']]
       })

    if (result && result.length) {
         let count = await db.product.count()
        return { success: true, message: "Product Found", data: result,count} 
    }else{
        return { success: false, message: "Product Not Found", data: result }
    }
}

exports.getDataById = async (id) => {
    const result = await db.product.findOne({
        where: { id }
    })
    if (result) {
        return { success: true,message: "Product Found", data: result }
    }else{
        return { success: false, message: "Product Not Found", data: result }
    }
}

exports.addData = async (userId,{ categoryId, name, description, price, stock, isAvailable }) => { 
    const checkproduct = await db.product.findOne({where:{categoryId, name}});
    if (checkproduct) {
        return { success: false, message: "Product already exist" }
        }
    const result = await db.product.create({categoryId, userId, name, description, price, stock, isAvailable })
    if (result) {
        return { success: true,message: "Product Added", data: result }
    }else{
        return { success: false, message: "Product Not Added", data: result }
    }
}

exports.updateDataById = async (id, { categoryId, name, description, price, isAvailable  }) => {
    const result = await db.product.update({ categoryId, name, description, price, isAvailable },{ where: { id } })
    if (result[0]){
        return { success: true, data: result, message: "Product updated" }
    }else{
        return { success: false, data: result, message: "Product Not updated"}
    }
   
}

exports.deleteDataById = async (id) => {
    const result = await db.product.destroy({ where: { id } })
    if (result) {
        return { success: true, result, message: "Product Deleted" }
    }else{
        return { success: false, result, message: "Product Not found" }
    }
}

