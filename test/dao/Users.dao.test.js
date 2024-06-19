import mongoose from "mongoose";
import {UserManager} from "../../src/dao/mongodb/managers/user.managerDB.js";
import Assert from "assert";

mongoose.connect(`mongodb+srv://matiascarmona2002:FR4GYOU6@eccomercecoder.un2azzy.mongodb.net/ecommerce-test`);

const assert = Assert.strict;

describe("Testing Users Dao", () => {

    //before

    before(function(){
        this.usersManager = new UserManager()
    })

    //beforeeach

    beforeEach(function(){
        this.timeout(7000);//tiempo de espera por la db
        mongoose.connection.collections.users.drop();
    })

    //it_01

    it('El dao debe crear un usuario con exito a la Base de Datos', async function(){

        //Given
        let mockUser = {
            first_name: 'User Prueba_01',
            last_name: 'User Prueba_01',
            age: 0,
            email: 'Usertest@gmail.com',
            password: 'Userprueba',
        }

        //Then
        const result = await this.usersManager.createUser(mockUser);

        //Assert
        assert.ok(result._id)
    })

    //it_02
    it('El dao debe obtener un usuario por email', async function(){
        
        //Given
        let mockUser = {
            first_name: 'User Prueba_01',
            last_name: 'User Prueba_01',
            age: 0,
            email: 'Usertest@gmail.com',
            password: 'Userprueba',
        }

        //Then
        const result = await this.usersManager.createUser(mockUser);

        const user = await this.usersManager.findUserEmail({ email: result.email })

        //Assert
        assert.strictEqual(typeof user, 'object');

    })

    //it_03
    it('El dao debe obtener un usuario por ID', async function(){
        
        //Given
        let mockUser = {
            first_name: 'User Prueba_01',
            last_name: 'User Prueba_01',
            age: 0,
            email: 'Usertest@gmail.com',
            password: 'Userprueba',
        }

        //Then
        const result = await this.usersManager.createUser(mockUser);
        const user = await this.usersManager.findUserId(result._id);

        //Assert
        assert.strictEqual(typeof user, 'object');

    })
    
    //it_04
    it('El dao debe obtener el carrito de usuario por ID de carrito', async function(){
        
        //Given
        let mockUser = {
            first_name: 'User Prueba_04',
            last_name: 'User Prueba_04',
            age: 0,
            email: 'Usertest4@gmail.com',
            password: 'Userprueba',
            cart: new mongoose.Types.ObjectId()
        }

        //Then
        const result = await this.usersManager.createUser(mockUser);
        const cart = await this.usersManager.findCartIdbyUser(result.cart);

        //Assert
        assert.strictEqual(cart._id.toString(), result.cart.toString());

    })

    //after
    //aftereach
    
})