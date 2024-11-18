
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/products', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send('Error reading data');
        }
        res.json(JSON.parse(data));
    });
});


app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id; 
    
    fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send('Error reading data');
        }

        const products = JSON.parse(data);
        const product = products.find(p => p.id == productId);  
        
        if (product) {
            res.json(product); 
        } else {
            res.status(404).send('Product not found');
        }
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/products.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

app.get('/demo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'demo.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
