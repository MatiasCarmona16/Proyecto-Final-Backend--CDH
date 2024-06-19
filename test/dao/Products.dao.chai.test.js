import mongoose from "mongoose";
import { ProductManager } from "../../src/dao/mongodb/managers/products.managerDB.js";
import * as chai from 'chai';

mongoose.connect(`mongodb+srv://matiascarmona2002:FR4GYOU6@eccomercecoder.un2azzy.mongodb.net/ecommerce-test`);

const expect = chai.expect;

describe("Testing Products Dao", () => {

    before(function(){
        this.productsManager = new ProductManager();
    });

    beforeEach(function(){
        this.timeout(7000);
        mongoose.connection.collections.products.drop();
    });

    //It 01
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
        expect(result._id).to.be.ok;
    });


    //It 02
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
        expect(result).to.be.an('object');
    });



    //It 03
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
        const resultwitId = result._id
        const prod = await this.productsManager.getProductsId(resultwitId);

        //Assert
        expect(resultwitId).to.be.ok;
        expect(prod).to.be.ok;
    });


});