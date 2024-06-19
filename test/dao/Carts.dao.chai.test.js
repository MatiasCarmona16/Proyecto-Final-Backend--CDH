import mongoose from "mongoose";
import { CartManager } from "../../src/dao/mongodb/managers/cart.managerDB.js";
import * as chai from "chai";

mongoose.connect(`mongodb+srv://matiascarmona2002:FR4GYOU6@eccomercecoder.un2azzy.mongodb.net/ecommerce-test`);

const expect = chai.expect;

describe("Testing Carts Dao", () => {

    before(function(){
        this.cartsManager = new CartManager();
    });

    beforeEach(function(){
        this.timeout(7000);
        mongoose.connection.collections.carts.drop();
    });

    //It 01
    it('El dao debe crear un carrito con éxito', async function(){
        //Given

        //Then
        const result = await this.cartsManager.createCart();
        
        //Assert
        expect(result._id).to.be.ok;
        expect(result.products).to.be.an('array');
    });


    //It 02
    it('El dao debe obtener un carrito por ID', async function(){
        //Given

        //Then
        const cart = await this.cartsManager.createCart();
        const result = await this.cartsManager.findIdCart(cart._id);
        
        //Assert
        expect(result).to.be.ok;
        expect(result).to.be.an('object');
    });


    //It 03
    it('El dao debe eliminar un producto específico del carrito', async function(){
        //Given

        //Then
        const cart = await this.cartsManager.createCart();
        const productId = new mongoose.Types.ObjectId();
        cart.products.push({ id_prod: productId, quantity: 1 });
        await cart.save();

        const updatedCart = await this.cartsManager.deleteSpecificProduct(
            cart._id, productId);
        
        //Assert
        expect(updatedCart.products).to.have.lengthOf(0);
        expect(updatedCart.products.find(p => p.id_prod.toString() === productId.toString())).to.be.undefined;
    });

});