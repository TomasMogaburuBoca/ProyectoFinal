const express = require ('express');
const { Router } = express;
const routerProducts = Router();
const Container = require ('../Container/index');
const { authMiddleware } = require ('../middlewares');
const admin = true;


const products = new Container('products.txt');
console.log(products);

routerProducts.get ('/', async(req, res) =>{
    const prods = products.getAll();
    const result = await prods;
    res.json(result);
    res.render("/api/products",{
        products: result,
    });
});

routerProducts.get('/:id', async (req,res)=>{
    const id = req.params.id;
    const filter = products.getById(id);
    const result = await filter;
    if (!result){
        res.json({message: 'Product not found by ID'})
    }else {res.json(result)}
});

routerProducts.post('/', async (req, res) =>{
    if (admin){
        const item = req.body;
        const itemAdded = products.save(item);
        const result = await itemAdded;
        const getAll = await products.getAll();
        res.send(result);
        res.render('api/products',{
            products: getAll()
        });
    }else {res.send('Route not found')}
})

routerProducts.put('/:id', async (req, res) =>{
    if (admin) {
        const id = req.params.id;
        const item = req.body;
        const prod = await products.update(item, id);
        res.json(prod)
    }else {res.send('Route not available')}
});

routerProducts.delete(':id', async (req, res) =>{
    if(admin){
        const id = req.params.id;
        const newArray = await products.deleteById(id);
        res.send(newArray);
    }else {res.send('Route not available')}
})



module.exports = routerProducts;
