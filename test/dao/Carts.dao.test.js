import mongoose from "mongoose";
import { CartManager } from "../../src/dao/mongodb/managers/cart.managerDB.js";
import Assert from "assert";

mongoose.connect(`mongodb+srv://matiascarmona2002:FR4GYOU6@eccomercecoder.un2azzy.mongodb.net/ecommerce-test`);

const assert = Assert.strict

describe("Testin Carts Dao", () => {

    //before

    before(function(){
        this.cartsManager = new CartManager()
    })

    //beforeeach

    beforeEach(function(){
        this.timeout(7000);//tiempo de espera por la db
        mongoose.connection.collections.carts.drop();
    })

    //it_01

    it('El dao debe crear un carrito con éxito', async function(){
        //Given

        //Then
        const result = await this.cartsManager.createCart();

        //Assert
        assert.ok(result._id);
        assert.strictEqual(Array.isArray(result.products), true);
    });


    //it_02

    it('El dao debe obtener un carrito por ID', async function() {
        //Given


        //Then
        const cart = await this.cartsManager.createCart();
        const result = await this.cartsManager.findIdCart(cart._id);

        //Assert
        assert.ok(result);
        assert.strictEqual(typeof result, 'object');
    })


    //it 03

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
        assert.ok(updatedCart);
        assert.strictEqual(updatedCart.products.length, 0);
        assert.strictEqual(updatedCart.products.find(p => p.id_prod.toString() === productId.toString()), undefined);

    })

})