const express = require ('express');
const { Router } = express;
const routerProducts = Router();
const Container = require ('../Container/index');

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

routerProducts.post('/', (req, res) =>{
    let products = products.getAll();
    let addProducts = products
});

routerProducts.put('/:id', (req, res) =>{
    console.log('Acutaliza prods por su ID');
})

routerProducts.delete('/:id', (req, res) =>{
    let deleteProductById = products.deleteById();
    res.send (deleteProductById)
    console.log('PARA BORRAR');
})

module.exports = routerProducts;
