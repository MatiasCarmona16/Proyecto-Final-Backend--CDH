import { Router } from "express";

const chatRouter = Router ()

chatRouter.get("/", async (req, res) => {
    res.render('chat', {}) //devuelve especificamente el 'chat' de "chat.handlebars"
})

export { chatRouter }