const fs = require ('fs');

class Container{
    constructor(file){
        this.file = file;
    }


    async getAll(){
        try{
            let content = await fs.promises.readFile(this.file);
            let data = JSON.parse(content);
            return data
        } catch (error){ return console.log(error);}
    }

    async saveCart (obj){
        const data = await this.getAll();

        let id = data[data.length - 1] + 1;
        let timestamp = Date.now();
        const cart = {
            id: id,
            timestamp: timestamp,
            products: [obj]
        }
        data.push(cart);

        try{
            if (data.length == 0){
                id = 1;
                cart.id =id;
            }else {cart.id =data.length;}
            await fs.promises.writeFile(this.file, JSON.stringify(data));
            return cart;
        }catch(error) {console.log(error)};
    }

    async save(obj){
        const data = await this.getAll();

        let id = data[data.length -1] +1;

        obj.id = id;
        let timestamp = Date.now();
        obj.timestamp = timestamp;

        data.push(obj)

        try{
            if (data.length == 0) {
                id = 1;
                obj.id = id;
            } else {
                obj.id = data.length;
            }

            await fs.promises.writeFile(this.file, JSON.stringify(data));
            return obj;
        } catch(error){
            console.log(error);
        }
    }


    async getById(num){
        try{
            let data = await this.getAll();
            let result = data.find(obj => {
                if(num ==obj.id){
                    return obj;
                }else return null;
            });
            return result;
        }catch(error){console.log(error);}
    }

    async deleteById(id){
            try{
                let data = await this.getAll();
                console.log(id);
                let eliminated = data.filter (obj => {
                    if(id != obj.id){return obj}
                    else{return null}
                })
                console.log(eliminated);
                fs.promises.writeFile(this.file, JSON.stringify(eliminated));
                return eliminated;
            }catch (error){console.log(error);}
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.file, '[]');
        }catch(error){console.log(error);}
    }

    async deleteProd(num, prodId){
        try{
            const data = await this.getById(num);
            const arrayProd = await data.products;
            const filter = arrayProd.filter(obj=>{
                if(prodId != obj.id){return obj}
                else{return null}
            });
            const newCart = {...data, products:filter};
            console.log(newCart);
            const add = await this.deleteById(id);
            add.push(newCart);
            const dataFinal = add.sort((a, b) =>{
                return a.id - b.id;
            })
            const newArray = fs.promises.writeFile(
                this.file, JSON.stringify(dataFinal)
            );
            return newArray;
        }catch (error){console.log(error);}
    }


    async update(prod, id) {
        const data = await this.deleteByID(id);
        const newProd = { ...prod, id };
        data.push(newProd);
        const dataFinal = data.sort((a, b) => {
            return a.id - b.id;
        });

        const newArray = fs.promises.writeFile(
            this.url,
            JSON.stringify(dataFinal)
        );
        return newArray;
    }
}


module.exports = Container;