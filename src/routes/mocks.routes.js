import { Router } from "express";
import { generateProductsMocks } from "../controllers/mocks.manager.js";

const routerMocks = Router ();

routerMocks.get('/', generateProductsMocks)

export { routerMocks }