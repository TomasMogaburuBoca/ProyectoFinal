const express = require ('express');
const {Router} = express;
const routerCarts = Router();
const Container = require ('../Container/index');

const carts = new Container('carts.txt');
console.log(carts);


routerCarts.post ('/', async (req, res) =>{
    let showCarts = req.body
    let arrayCarts = carts.push(showCarts);
    console.log(arrayCarts);
    //let showProducts =  await carts.getAll();
    res.send(([arrayCarts]));
})

routerCarts.delete('/:id', (req, res) =>{
    let deleteCartById = req.params.id
    if(deleteCartById != id){
        res.send(carts = []);
    }else
    console.log("Can't delete");
});

routerCarts.get ('/:id/products', async (req, res) =>{
    let showCarts = await carts.getAll();
    console.log([...showCarts]);
    res.send([...showCarts]);
})

routerCarts.post('/:id/products', async(req, res) =>{
    let addProduct = req.query.id
    let products = await carts.products.getAll()
    products.push(addProduct);
    console.log('ok');
})

routerCarts.delete('/:id/products/:id_prod', (req, res) =>{
    console.log('Eliminar un prod del cart por us id de carrito y de prod');
})

module.exports = routerCarts;