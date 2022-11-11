const fs = require ('fs');

class Product {
    constructor(){
        this.path = 'products.txt';
    }

    async save (product) {
        try{
            if (!product || typeof product !== 'object'){
                throw Error ('Add an object please')
            }
            if (Object.keys(product).length === 0){
                throw Error ('Its empty object')
            }
            if (!fs.existsSync(this.path)){
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify([], null, 2), 'utf-8');
            }
            let data = await fs.promises.readFile(this.path, 'utf-8');
            let newProduct = {};
            const timestamp = Date.now();
            delete product.admin;
            if (data !== '') {data = JSON.parse(data)};
            if (data.length > 0){
                data = data.sort ((a, b) => a.id - b.id);
                newProduct = {
                    ...product,
                    id : data[data.length -1].id +1,
                    timestamp,
                };
                data = [...data, newProduct];
            }else {
                newProduct = {...product, id: 1, timestamp};
                data = [newProduct]
            }
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(data, null, 2), 'utf-8');
                return newProduct.id;
            } catch (error) {throw Error(error.message)}
    };


    async getById (id) {
        try{
            if (!id || typeof id !== 'number'){
                throw Error ('Put a number')
            };
            if (!fs.existsSync(this.path)){
                throw Error ('The file not exist, please create one');
            };
            let data = await fs.promises.readFile(this.path, 'utf-8');
            if (data === '' && data.length === 0){
                throw Error ('Whit out content');
            };
            data = JSON.parse(data);
            const findData = data.find ((product) =>{
                product.id === id});
            if (!findData) throw Error ('Product not found');
            return findData;
        }catch (error) {throw Error(error.message)}
    }

    async updateById (id, newProduct) {
        try {
            if (!id || typeof id !== 'number'){
                throw Error ('Put a number')
            };
            if (!fs.existsSync(this.path)){
                throw Error ('The file not exist, please create one');
            };
            const currentProduct = await this.getByID(id);
            await this.deleteById(id);
            let data = await this.getAll();
            data = [...data, {id: currentProduct.id, newProduct}];
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(data, null, 2), 'utf-8');
                return 'Product was updated successfully';
        }catch (error) {throw Error (error.message)}
    }

    async getAll () {
        try {
            if (!fs.existsSync(this.path)){
                throw Error ('The file not exist, please create one');
            }
            let data = await fs.promises.readFile(this.path, 'utf-8');
            if (data === '' && data.length === 0){
                throw Error (' With out content');
            }
            data = JSON.parse(data);
            data = data.sort((a, b) => a.id - b.id);
            return data;
        }catch (error) {error.message}
    }

    async deleteById (id) {
        try {
            if (!id || typeof id !== 'number'){
                throw Error ('Put a number');
            }
            if (!fs.existsSync(this.path)){
                throw Error ('The file not exist, please create one');
            }
            let data = await fs.promises.readFile(this.path, 'utf-8');
            if (data === '' && data.length === 0){
                throw Error ('With out content');
            }
            data = JSON.parse(data);
            const index = data.findIndex ((product) =>{
                return product.id === id});
            if (index === -1) {return 'Product not found'};
            data = data.filter ((product) =>{
                return product.id != id;
            });
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(data, null, 2), 'utf-8');
            return 'Product was deleted successfully';
        }catch (error) {throw Error (error.message)}
    }

    async deleteAll() {
        try {
            if (!fs.existsSync(this.path)) {
                throw Error('The file not exists, please created');
            }
            let data = await fs.promises.readFile(this.path, 'utf-8');
            if (data === '' && data.length === 0) {
                throw Error('The file not have content');
            }
            data = JSON.parse(data);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify([], null, 2),'utf-8');
            return 'Products were deleted successfully';
            } catch (error) {
            throw Error(error.message);
        }
    }
};

module.exports = Product;