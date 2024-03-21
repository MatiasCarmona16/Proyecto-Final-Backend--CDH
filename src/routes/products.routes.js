import { Router } from "express";
import { ProductManagerMongo } from "../../dao/mongoDB/controllers/productManager.js";

const productManagerMongo = new ProductManagerMongo()

const routerProd = Router ()

routerProd.get('/', async(req,res) => {
    try {
    const { limit = 10, page = 1, sort, query} = req.query

    const prods = await productManagerMongo.getProducts(
        { 
        limit,
        page,
        sort,
        query
        }
        )
    res.status(200).json(prods)
    }catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//-----OBTENER PRODUCTO BY ID-----

routerProd.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const reply = await productManagerMongo.getProductsById(id)

        if(!reply) {
            res.status(404).json({ msg:'Producto fuera de lista'})
        }
        res.status(200).json(reply)
        
    } catch (error) {
        res.status(500).json({error})
    }

    
})

//-----AGREGO UN NUEVO PRODUCTO MEDIANTE POST-----

routerProd.post('/create', async(req, res) => {
    try {
        const { title, description, thumbnail, price, category, stock, code } = req.body;
        const prod = await productManagerMongo.addProduct({
            title,
            description,
            thumbnail,
            price,
            category,
            stock,
            code
        });
        res.status(200).json({ prod })
    } catch (error) {
        res.status(500).json({ error })
    }
})

//----------ENVIO EL ID + REQ.BODY---------

routerProd.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const { title, description, thumbnail, price, category, stock, code } = req.body
        
        const confi = await productManagerMongo.updateProduct(id, { 
            title, 
            description, 
            thumbnail, 
            price, 
            category, 
            stock, 
            code 
        })

    if(confi) {
        res.status(200).json({ confi })
    }else {
        res.status(404).send('Producto inexistente')
    }
    }catch (error) {
        res.status(500).json({ error })
    }
})

//-----ENVIO ID PARA ELIMINAR PRODUCTO-----

routerProd.delete('/:id' , async(req, res) => {
    const { id } = req.params

    try {
        const confi = await productManagerMongo.deleteProduct(id)

        if(confi) {
            res.status(200).json( confi )
        }else {
            res.status(404).send('Producto inexistente')
        }
    }catch (error) {
        res.status(500).json({ error })
    }
})

export { routerProd }