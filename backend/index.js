const express = require("express");
const cors = require("cors");

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();  //save function to save the data
    result = result.toObject();       //to remove password from object that we get
    delete result.password;         //
    res.send(result);
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");   //to find match & select method with a minus sign to exclude password in MongoDB
        if (user) {
            res.send(user);
        }
        else {
            res.send({ result: "No user found" });
        }
    }
    else {
        res.send({ result: "No user found" });
    }
})

app.post('/add-product', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products', async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    }
    else {
        res.send({ result: "No product found" });
    }
})

app.delete("/products/:id", async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

//Update Products
app.get("/products/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: "No product found" });
    }
})

app.put("/products/:id", async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send(result);
})

app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key, $options: 'i' }       //$regex operator for pattern matching strings in queries.
            },
            {
                company: { $regex: req.params.key, $options: 'i' }     //case-insensitive searches, you can use the i option
            },
            {
                category: { $regex: req.params.key, $options: 'i' }
            }
        ]
    });
    res.send(result);
})

app.listen(5000);
console.log("Server started with port 5000");