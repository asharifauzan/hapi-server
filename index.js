const Hapi = require('@hapi/hapi');
const Path = require('path');

// all routes
const {
	show404,
} = require('./routing/helper');
const {
	getProducts,
	getProductById,
} = require('./routing/show');
const addProduct = require('./routing/add')
const editProduct = require('./routing/update')
const deleteProduct = require('./routing/delete')

const port = process.env.PORT || 8080;

const init = async ()=> {

	const server = Hapi.server({
		port: port,
		host: '0.0.0.0',
		"routes": {
			"cors": {
				origin: ["*"],
				headers: ["Accept", "Content-Type"],
				additionalHeaders: ["X-Requested-With"]
			},
			files: {
                relativeTo: Path.join(__dirname, 'upload')
            }
		}
	})

	await server.register(require('@hapi/inert'));
	
	server.route({
		method: 'GET',
		path: '/{filename}',
		handler: {
			file: function (request) {
				return request.params.filename;
			}
		}
	});

	//  ------ API ---------
	server.route({
		method: 'GET',
		path: '/product',
		handler: getProducts,
	})
	
	server.route({
		method: 'GET',
		path: '/product/{id}',
		handler: getProductById
	})
	
	server.route({
		method: 'POST',
		path: '/product',
		options: {
			payload: {
				// maxBytes: 209715200,
				output: 'stream',
				parse: true,
				multipart: true
			},
			handler: addProduct
		}
	})

	server.route({
		method: 'PUT',
		path: '/product/{id}',
		options: {
			payload: {
				maxBytes: 209715200,
				output: 'stream',
				parse: true,
				multipart: true
			},
			handler: editProduct
		}
	})

	server.route({
		method: 'DELETE',
		path: '/product/{id}',
		handler: deleteProduct
	})

	server.route({
		method: '*',
		path: '/{any*}',
		handler: show404
	})

	await server.start();
	console.log('Server is running on port', server.info.uri);

}

process.on('unhandledRejection', (err)=> {
	console.log(err);
	process.exit(1);
})

init();
