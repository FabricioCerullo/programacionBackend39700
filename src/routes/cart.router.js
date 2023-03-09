import { Router, json } from "express";
import CartManager from "../manager/cart.js";
import ProductManager from "../manager/desafioJsBackend.js";


const cartRouter = Router();
//cartRouter.use(json());


cartRouter.post('/', async (req, res)=>{
    await CartManager.addNewCart();
    res.send({status:"sucess", payload: "carro añadido"});
})

cartRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    let carro = await CartManager.findCartToID(cid);
    res.send({status:"sucess", payload: carro});
})

cartRouter.post('/:cid/product/:pid', async(req, res)=>{
    const {cid, pid} = req.params;
    const cartid = parseInt(cid);
    const prodid = parseInt(pid);
    let product = await ProductManager.getProductById(prodid);
    await CartManager.addProductToCart(product, cartid);
    res.send({status:"sucess", payload:await CartManager.findCartToID(id)});
})

export default cartRouter;