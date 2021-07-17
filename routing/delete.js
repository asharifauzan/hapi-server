const databases = require('../db/database');

const deleteProduct = (req, res)=> {
    
    // get product by id parameter
    const { id } = req.params;
    let product = databases.filter(n=> n.id == id)[0];

    // ERROR: product not found
    if(!product) {
        return res.response({
            status: "fail",
            message: "Product gagal dihapus. Id tidak ditemukan"
        }).code(404);
    }

    // delete the boook
    const indexAt = databases.findIndex(n=> n.id == id);
    databases.splice(indexAt, 1);

    // product has deleted
    return res.response({
        status: "success",
        message: "Product berhasil dihapus"
    })
}

module.exports = deleteProduct