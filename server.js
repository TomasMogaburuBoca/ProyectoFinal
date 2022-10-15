const express = require ('express');
const app = express();
const fs = require ('fs');
const routerProducts = require ('./routes/products')
const routerCarts = require ('./routes/carts')
const Container = require('./Container/index');

app.use ('/api/carts', routerCarts);
app.use ('/api/products', routerProducts)

routerProducts.use(express.json());
app.use(express.urlencoded({ extended: true }));
routerCarts.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.port || 8080;

const server = app.listen(PORT, () =>{
    console.log(`Server listening in PORT ${PORT}`);
})
server.on('error', error => console.log(error));