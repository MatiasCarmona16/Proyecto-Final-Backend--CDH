import mongoose from "mongoose";
import { ProductManager } from "../../src/dao/mongodb/managers/products.managerDB.js";
import Assert from "assert";

mongoose.connect(`mongodb+srv://matiascarmona2002:FR4GYOU6@eccomercecoder.un2azzy.mongodb.net/ecommerce-test`);

const assert = Assert.strict;

describe("Testing Products Dao", () => {

    //before

    before(function(){
        this.productsManager = new ProductManager()
    })

    //beforeeach

    beforeEach(function(){
        this.timeout(600);//tiempo de espera por la db
        mongoose.connection.collections.products.drop();
    })

    //it_01

    it('El dao debe crear un producto con exito a la Base de Datos', async function(){

        //Given
        let mockProduct = {
            title: 'Prod Prueba_01',
            description: 'Prod Prueba_01',
            price: 100,
            category: 'Celulares',
            stock: 20,
            code: "ASD213ASD22"
        }

        //Then
        const result = await this.productsManager.addProduct(mockProduct);
        
        //Assert
        assert.ok(result._id)
        assert.strictEqual(typeof result, 'object');
    })


    //it_02

    it('El dao debe traer los productos con exito de la Base de Datos', async function(){

        //Given
        let mockProduct = {
            title: 'Prod Prueba_05',
            description: 'Prod Prueba_05',
            price: 100,
            category: 'Celulares',
            stock: 20,
            code: "ASD213ASD22SADASD"
        }


        //Then
        const addProd = await this.productsManager.addProduct(mockProduct);
        const result = await this.productsManager.getProducts(addProd);

        //Assert
        assert.strictEqual(typeof result.payload[0]._id, 'object');
        assert.ok(result.payload[0]._id);
        assert.strictEqual(typeof result.totalPages, 'number');
    })


    //it_03

    it('El dao debe traer un producto con el id de la Base de Datos', async function(){

        //Given
        let mockProduct = {
            title: 'Prod Prueba_05',
            description: 'Prod Prueba_05',
            price: 100,
            category: 'Celulares',
            stock: 20,
            code: "ASD213ASD22SADASD"
        }


        //Then
        const result = await this.productsManager.addProduct(mockProduct);
        const prod = await this.productsManager.getProductsId(result._id);

        //Assert
        assert.ok(prod); 
        assert.strictEqual(prod.title, mockProduct.title); 
        assert.strictEqual(prod.description, mockProduct.description);
    })

    //after
    //aftereach
    
})