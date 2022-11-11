const express = require ('express');
const router = express.Router();
const admin = require('../middlewares/index')
const {
    getProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById,
} = require('../Controllers/product.controller');


router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', admin, createProduct);
router.put('/:id', admin, updateProductById);
router.delete('/:id', admin, deleteProductById);



module.exports = router;
