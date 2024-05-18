import { faker } from "@faker-js/faker/locale/es";

export const generatorProductsEccom = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int({min: 0, max: 100}),
        code: faker.string.alphanumeric(8) ,
        id: faker.database.mongodbObjectId()
    }
}