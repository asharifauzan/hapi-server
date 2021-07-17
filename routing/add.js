const fs = require('fs')
const { nanoid } = require('nanoid');

// include database in array
const databases = require('../db/database');
const { handleFileUpload, formValidation } = require('./helper')

const addProduct = (req, res)=> {
   
    // prepare new book
    const newProduct = {
        name,
        purchase_price,
        sell_price,
        stock,
        img
    } = req.payload
    newProduct.id = nanoid(6),
    newProduct.purchase_price = newProduct.purchase_price;
    newProduct.sell_price     = newProduct.sell_price;
    newProduct.stock         = newProduct.stock;
    
    // VALIDATE Input
    formValidation(name, purchase_price, sell_price, stock, req, res)
    
    const filename = handleFileUpload(img)
    // ERROR: file fail to upload
    if(!filename) {
        return res.response({
            status: "fail",
            message: "Kesalahan Saat mengupload file"
        }).code(400)
    }

    newProduct.img = filename

    // new book has pushed
    if(databases.push(newProduct)) {
        return res.response({
            status: "success",
            message: "Product berhasil ditambahkan",
            data: {
                id: newProduct.id,
            }
        }).code(201);
    }
    
    // ERROR: failed to created new data
    return res.response({
        status: "fail",
        message: "Product gagal ditambahkan"
    }).code(500);
}

module.exports = addProduct