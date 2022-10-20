const fs = require ('fs');

class Container{
    constructor(file){
        this.file = file;
    }

    async save (product){
        let content = await fs.promises.readFile(this.file);
        let contObject = JSON.parse(content);
        let newId;
            if(contObject.length > 0){
                newId = contObject.length +1}
            else {newId = 1};
        product.id = newId;
        contObject.push(product)
    }


    async getAll(){
        let content = await fs.promises.readFile(this.file);
        let contObject = JSON.parse(content);
        return contObject
    }

    async getById(id){
        let contObject = await this.getAll();
        let result = contObject.find(obj => obj.id == id);
        console.log(result);
    }

    async deleteById(id){
        let contObject = await this.getAll();
        console.log(id);
        let eliminated = contObject.find (obj => obj.id !== id)
        console.log(eliminated);
        await fs.promises.writeFile(this.file, JSON.stringify(eliminated))
        res.send(eliminated)
    }

    async deleteByIdCart(id){
        let contObject = await this.getAll();
        let eliminatedById = contObject.find (obj => obj.id != id);
        await fs.promises.writeFile(this.file, JSON.stringify(eliminatedById))
    }

    async deleteAll(){
        await fs.promises.writeFile(this.file, '[]')
    }

    async getLength(){
    let list = await this.getAll();
    return await list.length;
    }
};

module.exports = Container;