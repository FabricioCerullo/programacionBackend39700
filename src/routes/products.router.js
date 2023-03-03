import { Router, json } from "express";
import ProductManager from "../desafioJsBackend.js";

const productRouter = Router();
productRouter.use(json());

let manager = new ProductManager();

let products = await manager.getProducts(); 
let addProducts = await manager.addProduct();


//devuelve los prod. con el limite, sino los devuelve todos.

productRouter.get('/', async (req,res) => {
    try {  
         const {limit} = req.query;
         
         if (limit) {
            const limitProduct = products.slice(0, limit);
            return res.send({status:"sucess", payload: limitProduct});
         }
         res.send({status:"sucess", payload: products});

    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }

})

//devuelve el prod. con la id indicada

productRouter.get("/:pid", async(req, res) => {
    try {
        const {pid} = req.params;
        const product = await manager.getProductById(parseInt(pid));
        res.send({status:"sucess", payload: product});

    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }
})

//se agrega un nuevo prod. 

productRouter.post("/", async(req, res) => {
    try {
        const {title, description, price, thumbail=[], code, stock, status=true, category} = req.body
        const newProd = addProducts(title, description, parseInt(price), thumbail, code, parseInt(stock), status, category);
        res.send(newProd);
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }

})

//se modifica algun elemento del prod. especificado con la id.

productRouter.put("/:pid", async(req, res) => {
    try {
        const {pid} = req.params;
        const id = parseInt(pid);
        await manager.updateProduct(id, req.body);
        res.send({status: "succes", payload: await manager.getProductById(id)});
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }
})


//se elimina el prod. especificado con la id.

productRouter.delete("/:pid", async (req, res)=> {
    try {
        const {pid} = req.params
        const id = parseInt(pid)
        await manager.deleteProduct(id);
        res.send({status: "succes", payload: "Su Producto ha sido elimando exitosamente!"})
    } catch (error) {
        res.status(404).send({status: "error", error: "Ha ocurrido un error!"});
    }

})


export default productRouter;