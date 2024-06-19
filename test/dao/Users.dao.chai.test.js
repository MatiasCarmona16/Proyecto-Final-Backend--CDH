import mongoose from "mongoose";
import {UserManager} from "../../src/dao/mongodb/managers/user.managerDB.js";
import * as chai from 'chai';

mongoose.connect(`mongodb+srv://matiascarmona2002:FR4GYOU6@eccomercecoder.un2azzy.mongodb.net/ecommerce-test`);

const expect = chai.expect;

describe("Testing Users Dao", () => {

    before(function(){
        this.usersManager = new UserManager();
    });

    beforeEach(function(){
        this.timeout(7000);
        mongoose.connection.collections.users.drop();
    });

    //It 01
    it('El dao debe crear un usuario con exito a la Base de Datos', async function(){
        //Given
        let mockUser = {
            first_name: 'User Prueba_01',
            last_name: 'User Prueba_01',
            age: 0,
            email: 'Usertest@gmail.com',
            password: 'Userprueba',
        };

        //Then
        const result = await this.usersManager.createUser(mockUser);
        
        //Assert
        expect(result._id).to.be.ok;
    });


    //It 02
    it('El dao debe obtener un usuario por email', async function(){

        //Given
        let mockUser = {
            first_name: 'User Prueba_01',
            last_name: 'User Prueba_01',
            age: 0,
            email: 'Usertest@gmail.com',
            password: 'Userprueba',
        };

        //Then
        const result = await this.usersManager.createUser(mockUser);
        const user = await this.usersManager.findUserEmail({ email: result.email });

        //Assert
        expect(user).to.be.an('object');
    });



    //It 03
    it('El dao debe obtener un usuario por ID', async function(){
        
        //Given
        let mockUser = {
            first_name: 'User Prueba_03',
            last_name: 'User Prueba_03',
            age: 0,
            email: 'Usertest3@gmail.com',
            password: 'Userprueba',
        };

        //Then
        const result = await this.usersManager.createUser(mockUser);

        

        const user = await this.usersManager.findUserId(result._id);

        //Assert
        expect(result._id).to.be.ok;
        expect(user).to.be.an('object');
        expect(user._id.toString()).to.equal(result._id.toString());
    });


    //It 04
    it('El dao debe obtener el carrito de usuario por ID de carrito', async function(){
        
        //Given
        let mockUser = {
            first_name: 'User Prueba_04',
            last_name: 'User Prueba_04',
            age: 0,
            email: 'Usertest4@gmail.com',
            password: 'Userprueba',
            cart: new mongoose.Types.ObjectId()
        };

        //Then
        const result = await this.usersManager.createUser(mockUser);
        const cart = await this.usersManager.findCartIdbyUser(result.cart);


        //Assert
        expect(cart._id.toString()).to.equal(result.cart.toString());
    });

});