const express = require ('express');
const { Router } = express;
const routerProducts = Router();
const Container = require ('../Container/index');
const ApiClass = require ('../Container/apiClass')
const { authMiddleware } = require ('../middlewares');


const products = new Container('products.txt');
console.log(products);
const apiProducts = new ApiClass('products.txt');
console.log(apiProducts);





routerProducts.get('/', async function (req, res) {
    getProducts = await products.getAll()
    console.log(getProducts);
    res.send(getProducts);
});

routerProducts.post('/', authMiddleware, async function (req, res){
    await products.save(products);
    apiProducts.add(req, res);
});

//routerProducts.put('/:id', authMiddleware,(req, res) =>{
//    console.log('Acutaliza prods por su ID');
    routerProducts.put('/:id', async function (req, res) {
        await apiProducts.modify(req, res);
    });
//})

routerProducts["delete"]('/:id', function (req, res) {
    apiProducts["delete"](req, res);
});

//routerProducts.delete('/:id',authMiddleware, (req, res) =>{
//    let deleteProductById = products.deleteById();
//    console.log(deleteProductById);
//    products.push(deleteProductById);
//    res.send(products)
//    console.log('PARA BORRAR');
//})

module.exports = routerProducts;
