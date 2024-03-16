const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static('css/'));
app.use(express.static('html/'));
app.use(express.static('script/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = "mongodb+srv://aquametrics4all:aquametrics4all@cluster0.87s2ryy.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'test',
})
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const productSchema = new mongoose.Schema({
    barcode: Number,
    productname: String,
    min: Number,
    max: Number,
    unit: String,
    brand: String
});

const productModel = mongoose.model('productdetails', productSchema);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/home.html');
});
app.get('/test', function (req, res) {
    res.sendFile(__dirname + '/html/fetch.html');
});
app.get('/save/:id/:name/:min/:max/:unit/:brand', async (req, res) => {
    var barcode = Number(req.params.id);
    var productname = req.params.name;
    var min = Number(req.params.min);
    var max = Number(req.params.max);
    var unit = req.params.unit;
    var brand = req.params.brand;
    try {
        const existingProduct = await productModel.findOne({ barcode });

        if (existingProduct) {
            await productModel.updateOne(
                { barcode: barcode },
                { min: min, max: max, unit: unit, productname: productname }
            );
            return res.status(200).json({ success: true, message: 'Product Updated successfully.' });
        } else {
            const newUser = new productModel({
                barcode: barcode,
                min: min,
                max: max,
                unit: unit,
                productname: productname,
                brand: brand
            });

            await newUser.save();
            return res.status(200).json({ success: true, message: 'Product saved successfully.' });
        }
    } catch (error) {
        console.error('Error saving/updating product:', error);
        res.status(500).json({ success: false, message: 'Failed to save/update product details.' });
    }
});

app.get('/fetch/:id', async (req, res) => {
    var barcode = Number(req.params.id);
    try {
        const user = await productModel.findOne({ barcode: barcode });

        if (user) {
            return res.status(200).json({ success: true, data: user });
        } else {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch product details.' });
    }
});
app.get('/fetch1/:id', async (req, res) => {
    var barcode = Number(req.params.id);
    try {
        const user = await productModel.findOne({ barcode: barcode });
        if (user) {
            return res.status(200).json({ success: true, min: user.min, max: user.max, name: user.productname, unit: user.unit, brand: user.brand });
        } else {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch product details.' });
    }
});
app.get('/count', async (req, res) => {
    try {
        const products = await productModel.find({});

        if (products.length > 0) {
            res.send({ count: products.length });
        } else {
            res.send("No products found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server is running successfully on port ' + port);
});
