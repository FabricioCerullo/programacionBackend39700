import { Router, json } from "express";
import CartManager from "../cartManager/cart.js";
import ProductManager from "../desafioJsBackend.js";


const cartRouter = Router();
cartRouter.use(json());


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
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);
    let product = await ProductManager.getProductById(pid);
    await CartManager.addProductToCart(cid, product);
    res.send({status:"sucess", payload:await CartManager.findCartToID(id)});
})

export default cartRouter;