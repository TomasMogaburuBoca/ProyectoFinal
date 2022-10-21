const express = require ('express');
const { Router } = express;
const routerProducts = Router();
const Container = require ('../Container/index');
const { authMiddleware } = require ('../middlewares');

const products = new Container('products.txt');
console.log(products);



routerProducts.get('/:id?', async (req, res) =>{
    let showProducts =  await products.getAll();
    let findForId = req.params.id
    console.log('New connection');
    console.log(findForId);
    console.log([...showProducts]);
    if(findForId){
        return showProducts
    }else res.send([...showProducts]);
    res.send (showProducts)
})

routerProducts.post('/', authMiddleware, async (req, res) =>{
    let product =  await products.getAll();
    console.log(product);
    let addProduct = req.body
    //let newProduct = 
    res.json(product.push(addProduct));
    //console.log(newProduct);
    //res.json (newProduct);
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
