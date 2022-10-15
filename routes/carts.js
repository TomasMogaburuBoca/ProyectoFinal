const express = require ('express');
const {Router} = express;
const routerCarts = Router();
const Container = require ('../Container/index');

const carts = new Container('carts.txt');
console.log(carts);


routerCarts.post ('/', (req, res) =>{
    res.send(console.log('crea un carrito y devuelve su id'));
})

routerCarts.delete('/:id', (req, res) =>{
    console.log('vacia carrito y lo elimina');
});

routerCarts.get ('/:id/products', async (req, res) =>{
    let showCarts = await carts.getAll();
    console.log([...showCarts]);
    res.send([...showCarts]);
})

routerCarts.post('/:id/products', (req, res) =>{
    console.log('ok');
})

routerCarts.delete('/:id/products/:id_prod', (req, res) =>{
    console.log('Eliminar un prod del cart por us id de carrito y de prod');
})

module.exports = routerCarts;