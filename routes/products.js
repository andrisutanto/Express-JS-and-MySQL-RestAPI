var express = require('express');
var router = express.Router();
const Validator = require("fastest-validator");

const { Product } = require('../models');

const v = new Validator();

// untuk menampilkan data keseluruhan
router.get('/', async (req, res) => {
    const products = await Product.findAll();
    return res.json(products);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    return res.json(product || {});
});

router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        brand: 'string',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res
            .status(400)
            .json(validate);
    }

    const product = await Product.create(req.body);

    res.json(product);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    //res.send(id); //res.send ini digunakan untuk memberikan response balik

    // cari dahulu, ID tersebut ada atau tidak di database, kemudian beri response
    let product = await Product.findByPk(id);
    if(!product) {
        return res.json({ message: 'Product Not Found'});
    }

    //jika datanya ada, maka
    const schema = {
        name: 'string|optional',
        brand: 'string|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res
            .status(400)
            .json(validate);
    }

    product = await product.update(req.body);
    res.json(product); //berikan response berupa data produk tsb
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if(!product) {
        return res.json({ message: 'Product Not Found'});
    }

    await product.destroy();

    res.json({
        message: 'Produk dihapus'
    });
});

module.exports = router;
