const databases = require('../db/database');

const getProducts = (req, res)=> {

    // return all data or [] if products is not exist
    const data = databases.map((val)=> {
        return { 
            id: val.id, 
            name: val.name, 
            purchase_price: val.purchase_price,
            sell_price: val.sell_price,
            stock: val.stock,
            img: val.img
        }
    })

    return res.response({
        status: "success",
        data: {
            products: data
        }
    })

}

const getProductById = (req, res)=> {
    
    // get product by id parameter
    const { id } = req.params;
    const product = databases.filter(n=> n.id == id)[0];

    // ERROR: books is not found
    if(!product) {
        return res.response({
            status: "fail",
            message: "Product tidak ditemukan"
        }).code(404);
    }

    // return the product
    return res.response({
        status: "success",
        data: {
            product
        }
    }).code(200);

}

module.exports = {
    getProducts,
    getProductById
}