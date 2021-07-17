const fs = require('fs')

const show404 = (req, res)=> {
    return res.response({
        status: "not found",
        message: "Endpoint tidak ditemukan"
    }).code(404);
}

const handleFileUpload = (file) => {
    if(!file.hapi) {
        return 0
    }
    const filename = file.hapi.filename
    const data = file._data    
    fs.writeFileSync('./upload/' + filename, data)

    return filename
}

const formValidation = (name, purchase_price, sell_price, stock, req, res) =>  {
    // ERROR: name is null
    if(name == "") {
        return res.response({
            status: "fail",
            message: "Gagal menambahkan produk. Mohon isi nama produk"
        }).code(400);
    }

    // ERROR: purchase_price not a number
    if(purchase_price !== parseInt(purchase_price, 10)) {
        return res.response({
            status: "fail",
            message: "Gagal menambahkan produk. Isi Harga Beli dengan angka"
        }).code(400);
    }

    // ERROR: sell_price not a number
    if(sell_price !== parseInt(sell_price, 10)) {
        return res.response({
            status: "fail",
            message: "Gagal menambahkan produk. Isi Harga Jual dengan angka"
        }).code(400);
    }

    // ERROR: stock not a number
    if(stocks !== parseInt(stocks, 10)) {
        return res.response({
            status: "fail",
            message: "Gagal menambahkan produk. Isi Stock dengan angka"
        }).code(400);
    }
}

module.exports = { 
                    show404,
                    handleFileUpload,
                    formValidation
                };