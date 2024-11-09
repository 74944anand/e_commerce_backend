const db = require('../models');
const pagination = require('../utils/pagination');

exports.getData = async (query) => {
    const { search, offset, pageSize } = pagination.paginationWithFromTo(
        query.search,
        query.page,
        query.limit
    ); 
    const result = await db.category.findAll({
        offset: offset,
        limit: pageSize,
        include:[
            {
                model: db.user,
                as: "userCategories",
                attributes: ["id", "firstName", "email"],
            }
        ] ,
        order: [['updatedAt', 'DESC']]
       })

    if (result && result.length) {
         let count = await db.category.count()
        return { success: true, message: "category Found", data: result,count} 
    }else{
        return { success: false, message: "category Not Found", data: result }
    }
}

exports.getDataById = async (id) => {
    const result = await db.category.findOne({
        where: { id }
    })
    if (result) {
        return { success: true,message: "Category Updated", data: result }
    }else{
        return { success: false, message: "Category Not Found", data: result }
    }
}

exports.addData = async (userId,{ name, description, isAvailable }) => { 
    const checkcategory = await db.category.findOne({where:{name}});
    if (checkcategory) {
        return { success: false, message: "Category already Exists" }
    }
    const result = await db.category.create({userId, name, description,isAvailable })
    if (result) {
        return { success: true,message: "Category Added", data: result }
    }else{
        return { success: false, message: "Category Not Added", data: result }
    }
}

exports.updateDataById = async (id, { name, description, isAvailable }) => {
    const result = await db.category.update({ name, description, isAvailable },{ where: { id } })
    if (result[0]){
        return { success: true, message: "Category Updated"}
    }else{
        return { success: false, message: "Category Not Updated"}
    }
   
}

exports.deleteDataById = async (id) => {
    const result = await db.category.destroy({ where: { id } })
    if (result) {
        return { success: true,  message: "Category Deleted" }
    }else{
        return { success: false, message: "Category Not found" }
    }
}

