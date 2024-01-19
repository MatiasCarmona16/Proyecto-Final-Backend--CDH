import { Router } from "express";


const routerProd = Router ()

routerProd.get('/', async(req,res) => {

})

routerProd.get('/:id', async (req, res) => {
    const {id} = req.params
})

routerProd.post('/', async(req, res) => {

})

routerProd.put('/:id', async (req, res) => {
    const {id} = req.params
})

routerProd.delete('/:id' , async(req, res) => {
    const {id} = req.params
})

export default routerProd