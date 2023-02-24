import express from "express";
import ProductManager from "./desafioJsBackend.js";

const app = express();
const manager = new ProductManager("./prod.json");
let prod = await manager.getProducts();

app.get("/products", async (req, res) => {
    res.send(prod);
});

app.get("/products/:id", async (req, res) => {
    let numeroProduct = parseInt(req.params.id);
    let prodFind = prod.find((x)=>x.id===numeroProduct);
    if (!prodFind) {
        res.send("Producto no encontrado!")
    }
    res.send(prodFind);
});

app.get("/products", async (req, res) => {
    const { limit } = req.query;
     res.send(prod.slice(0, limit));
 });
   
app.listen(8080, () => {
    console.log(`Server listening to port 8080`)
});