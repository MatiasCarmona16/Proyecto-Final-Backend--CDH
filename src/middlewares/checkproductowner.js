import { ProductsService } from "../services/products.services.js";

const productsService = new ProductsService()

//Middlewate para validar permisos de owner productos
export const checkProductOwnerShip = async (req, res, next) => {
    const user = req.session.user;
    const productId = req.params.id;

    try{

        const product = await productsService.getProductsIdService(productId);

        if(!product) {
            req.flash('error_msg', 'Producto no encontrado');
            return res.redirect('/productaccesspremium');
        }

        if(user.role === "admin" || (user.role === "premium" && product.owner === user.email)) {
            return next()
        }

        
        req.flash('error_msg', 'No tienes permiso para realizar esta acción');
        return res.redirect('/productaccesspremium');
    }catch(error) {
        req.flash('error_msg', error.message);
        return res.redirect('/productaccesspremium');
    }
};

export const checkProductOwnerShipInCart = async (req, res, next) => {
    const user = req.session.user;
    const productId = req.params.pid;

    try { 

        const product = await productsService.getProductsIdService(productId);

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