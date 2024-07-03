import {
    routerAuth,
    routerProds,
    routerHome,
    routerView,
    routerSession,
    routerProdsViews,
    routerCart,
    routerMocks,
    routerLoggerTest,
    routerProdsAdmin,
    routerViewTicket,
    routerCartView,
    routerProdsPremium
} from "./index.js";

const setRoutApi = async (app, requireLogin, passPrem) => {
    app.use("/api/products", requireLogin,passPrem, routerProds);
    app.use("/api/cart",  routerCart)
    app.use("/api/auth", routerAuth);
    app.use("/api/sessions", requireLogin, routerSession);
    app.use("/mockingproducts", routerMocks);
    app.use("/loggerTest", routerLoggerTest)
};

const setRoutViews = async (app, requireLogin, passAdmin, passPrem) => {
    app.use("/", routerHome);
    app.use("/auth", routerView);
    app.use('/productsview', requireLogin, routerProdsViews);
    app.use('/productaccesspremium',requireLogin ,passPrem ,routerProdsPremium)
    app.use('/productsaccesadmin',requireLogin, passAdmin, routerProdsAdmin)
    app.use('/ticket', requireLogin, routerViewTicket);
    app.use('/cart', requireLogin, routerCartView);
}

//Ruta swagger se encuentra en /middlewares/config.middlewares.js

export { setRoutApi, setRoutViews };