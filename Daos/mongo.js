import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String
})

const productModel = mongoose.model ('products', productSchema);


try {
    await mongoose.connect('mongodb+srv://tomasmogaburu:tomasmogaburu@cluster0.oehx48g.mongodb.net/?retryWrites=true&w=majority',{
        userNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log('Database conected');

    try{
        const newProduct = new productModel ({name: 'Longboard', description: 9.0,price: 1200, url: '', stock: 50, id: 1, timestamp: Date.now()},
                                            {name: 'Longboard', description: 9.3,price: 1300, url: '', stock: 45, id: 2, timestamp: Date.now()},
                                            {name: 'Longboard', description: 8.6,price: 1120, url: '', stock: 59, id: 3, timestamp: Date.now()});
        await newProduct.save()
        console.log('Product added');


    }
    catch (error){console.log(`Operation failed ${error}`)};
} catch (error){console.log(`Operation failed ${error}`)};