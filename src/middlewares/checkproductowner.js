import { findProductsId } from "../services/products.services.js";

//Middlewate para validar permisos de owner productos
export const checkProductOwnerShip = async (req, res, next) => {
    const user = req.session.user;
    const productId = req.params.id;

    try{

        const product = await findProductsId(productId);

        if(!product) {
            return res.status(400).json({ message: "Producto no encontrado" });
        }

        if(user.role === "admin" || (user.role === "premium" && product.owner === user.email)) {
            return next()
        }

        return res.status(403).json({ message: "No tienes permiso para realizar esta accion" });
    }catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkProductOwnerShipInCart = async (req, res, next) => {
    const user = req.session.user;
    const productId = req.body.productId;

    try {

        const product = await findProductsId(productId);

        if(!product){
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        if(user.role === "premium" && product.owner === user.email) {
            return res.status(403).json({ message: "No puedes agregar tus propios productos al carrito" });
        }

        return next();
    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}