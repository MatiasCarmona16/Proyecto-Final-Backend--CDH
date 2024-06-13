//Swagger
export const swaggerOptions = {

    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion API Adoptme",
            description: "Documentacion API Adoptme - para uso de swagger"
        }

    },
    apis: [`./src/docs/**/*.yaml`]
}

