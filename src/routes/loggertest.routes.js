import { Router } from "express";

const routerLoggerTest = Router();

routerLoggerTest.get('/', (req, res) => {
    req.logger.error("Prueba de log level error en Ruta")
    res.send('Probando Logger');
})

export {routerLoggerTest}