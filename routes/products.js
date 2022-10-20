const express = require ('express');
const { Router } = express;
const routerProducts = Router();
const Container = require ('../Container/index');
const { authMiddleware } = require ('../middlewares');

const products = new Container('products.txt');
console.log(products);



routerProducts.get('/:id?', async (req, res, id) =>{
    let showProducts =  await products.getAll();
    let productId = await products.getById(id);
    console.log('New connection');
    console.log([...showProducts]);
    console.log(productId);
    if(productId){
        return products.id
    }else res.send([...showProducts]);
    res.send (productId)
})

routerProducts.post('/', authMiddleware, async (req, res) =>{
    let products =  await products.getAll();
    let addProduct = req.body
    products.push(addProduct);
    res.send ([...products]);
});

routerProducts.put('/:id', authMiddleware,(req, res) =>{
    console.log('Acutaliza prods por su ID');
})

routerProducts.delete('/:id',authMiddleware, (req, res) =>{
    let deleteProductById = products.deleteById();
    console.log(deleteProductById);
    products.push(deleteProductById);
    res.send(products)
    console.log('PARA BORRAR');
})

module.exports = routerProducts;
