const productModel = require('../Model/product.model');
const product = new productModel();

module.exports = {
    createProduct: async (req, res) => {
        try {
            const id = await product.save(req.body);
                res.status(200).send({
                            status: 200,
                            data: {id},
                            message: 'product was added successfully',
                        });
            } catch (error) {
                    res.status(500).send({
                        status: 500,
                        messages: error.message,
                    });
            }
        },

    getProducts: async (req, res) => {
        try {
        const data = await product.getAll();
            res.send({
                            status: 200,
                            data: data,
                            message: 'products was obtained successfully',
                        });
            } catch (error) {
                res.status(500).send({
                    status: 500,
                    messages: error.message,
                });
            }
        },

    getProductById: async (req, res) => {
        const idProduct = parseInt(req.params.id);
        try {
        const data = await product.getById(idProduct);
            res.status(200).send({
                status: 200,
                data,
                message: 'product was obtained successfully',
            });
        } catch (error) {
        res.status(500).send({
            status: 500,
            messages: error.message,
        });
        }
    },

    updateProductById: async (req, res) => {
        const idProduct = parseInt(req.params.id);
        const product = req.body;
        try {
        await product.updateById(idProduct, product);
            res.status(200).send({
                status: 200,
                data: {
                id: idProduct,
                },
                message: 'product was updated successfully',
            });
        } catch (error) {
            res.status(500).send({
                status: 500,
                messages: error.message,
            });
        }
    },

    deleteProductById: async (req, res) => {
        const idProduct = parseInt(req.params.id);
        try {
            await product.deleteById(idProduct);
                res.status(200).send({
                    status: 200,
                    data: {
                    id: idProduct
                    },
                    message: 'product was delete successfully',
                });
        } catch (error) {
            res.status(500).send({
                status: 500,
                messages: error.message,
            });
        }
    }
};