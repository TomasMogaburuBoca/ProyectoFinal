const fs = require ('fs')

class Api{
    constructor(array){
        this.array = array
    }
    findById = (id)=>{
        findId = this.array.find(elem => elem.id==id);
        return findId;
    }

    add = (req,res)=>{
        const elem = req.body;
        elem.id = (this.array.length+1);
        elem.timestamp = Date.now();
        this.array.push(elem);
        res.redirect('/');
    }

    addCarrito = (req,res,arrayProducts)=>{
        const elem = req.body;
        elem.id = (this.array.length+1);
        elem.timestamp = Date.now();
        elem.products = arrayProducts;
        this.array.push(elem);
        res.json(elem);
    }

    getProductsOfCarrito = (req,res)=>{
        const {id} = req.params;
        console.log("Log del id parametrizado: ",id);

        for(let i=0;i<this.array.length;i++){
            if(id == this.array[i].id){
                res.send(this.array[i].products);
            }
        }
    }

    postProductsInCarrito = (req,res)=>{
        const {id} = req.params;
        const {product} = req.body;

        for(let i=0;i<this.array.length;i++){
            if(id == this.array[i].id){
                product.id = this.array[i].products.length+1;
                product.timestamp = Date.now();
                this.array[i].products.push(product);
                res.json(this.array[i].products);
            }
        }
    }

    get = (req,res)=>{
        const {id} = req.params;
        this.findById(id) != null ? res.send({element: this.findById(id)}) : res.send("Undefined");
    }

    modify = (req,res)=>{
        const {id} = req.params;
        const {element} = req.body;
        product.id = id;
        this.array.splice(parseInt(id-1),1,element);
        res.send({element});
    }

    delete = (req,res)=>{
        const {id} = req.params;
        console.log(this.array);
        const element = this.array.splice(parseInt(id-1),1);
        res.send({element});
    }

    deleteProductInCarrito = (req,res)=>{
        const {id} = req.params;
        const {id_prod} = req.params;
        console.log(id);
        console.log(id_prod);
        for(let i=0;i<this.array.length;i++){
            if(this.array[i].id==id){
                for(let j=0;j<this.array[i].products.length;j++){
                    if(this.array[i].products[j].id==id_prod){
                        const element = this.array[i].products.splice((this.array[i].products[j].id)-1,1);
                        res.send({element});
                    }
                }
            }
        }
    }
}

module.exports = Api;