import {
    routerAuth,
    routerProds,
    routerHome,
    routerView,
    routerSession,
    routerProdsViews,
    routerCart
} from "./index.js";

const setRoutApi = async (app, requireLogin, passAdmin) => {
    app.use("/api/products", requireLogin, passAdmin, routerProds);
    app.use("/api/cart",  routerCart)
    app.use("/api/auth", routerAuth);
    app.use("/api/sessions", requireLogin, routerSession);
};

const setRoutViews = async (app, requireLogin) => {
    app.use("/", routerHome);
    app.use("/auth", routerView);
    app.use('/productsview', requireLogin, routerProdsViews);
}

export { setRoutApi, setRoutViews };