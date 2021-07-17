const databases = require('../db/database');
const { handleFileUpload, formValidation } = require('./helper')

const editProduct = (req, res)=> {
    
    // get product by id parameter
    const { id } = req.params;
    let product = databases.filter(n=> n.id == id)[0];

    // ERROR: product not found
    if(!product) {
        return res.response({
            status: "fail",
            message: "Gagal memperbarui product. Id tidak ditemukan"
        }).code(404);
    }
    
    // prepare new book
    const newProduct = {
        name,
        purchase_price,
        sell_price,
        stock,
        img
    } = req.payload
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

    // replace product with new data
    const indexAt = databases.findIndex(n=> n.id == id);
    databases[indexAt] = {
        ...databases[indexAt],
        ...newProduct
    }

    // product is edited
    return res.response({
        status: "success",
        message: "product berhasil diperbarui"
    }).code(200);

}

module.exports = editProduct