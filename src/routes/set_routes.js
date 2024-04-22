import {
    routerAuth,
    routerProds,
    routerHome,
    routerView,
    routerSession,
} from "./index.js";

const setRoutApi = async (app, requireLogin) => {
    app.use("/api/products", requireLogin, routerProds);
    app.use("/api/auth", routerAuth);
    app.use("/api/sessions", requireLogin, routerSession);
};

const setRoutViews = async (app, requireLogin) => {
    app.use("/", routerHome);
    app.use("/auth", routerView);
}

export { setRoutApi, setRoutViews };