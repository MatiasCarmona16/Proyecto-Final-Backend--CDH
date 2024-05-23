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
    routerProdsAdmin
} from "./index.js";

const setRoutApi = async (app, requireLogin, passAdmin) => {
    app.use("/api/products", requireLogin, passAdmin, routerProds);
    app.use("/api/cart",  routerCart)
    app.use("/api/auth", routerAuth);
    app.use("/api/sessions", requireLogin, routerSession);
    app.use("/mockingproducts", routerMocks);
    app.use("/loggerTest", routerLoggerTest)
};

const setRoutViews = async (app, requireLogin, passAdmin) => {
    app.use("/", routerHome);
    app.use("/auth", routerView);
    app.use('/productsview', requireLogin, routerProdsViews);
    app.use('/productsaccesadmin',requireLogin, passAdmin, routerProdsAdmin)
}

export { setRoutApi, setRoutViews };