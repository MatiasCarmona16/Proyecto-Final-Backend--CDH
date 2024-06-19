import * as chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';


const expect = chai.expect
const requester = supertest('http://localhost:8080')

mongoose.connect(`mongodb+srv://matiascarmona2002:FR4GYOU6@eccomercecoder.un2azzy.mongodb.net/ecommerce-test`);



describe('Testing Users nivel App', () => {

    describe('Testing login and session', async () => {

    //before
        before(function () {
            this.cookie;
            this.mockUser = {
                first_name: 'User superTest_01',
                last_name: 'User superTest_01',
                age: 0,
                email: 'Usertest@gmail.com',
                password: 'UsersuperTest',
            }
        })
    
        //it 1
            it('Test debe registrar correctamente al usuario', async function (){
            //Given


            //Then
            const {statusCode} = await requester.post('/api/auth/register').send(this.mockUser)

            //Assert
            expect(statusCode).is.eqls(302)
            })

        
        //it 2
        it('Test debe loguear correctamente al usuario', async function (){
            //Given
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password
            }

            //Then
            const result = await requester.post('/api/auth/login').send(mockLogin)

            const cookieResult = result.header['set-cookie'][0]
            const cookieData = cookieResult.split('=')
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }

            //Assert
            expect(this.cookie.name).is.ok
            expect(this.cookie.value).is.ok

            })


            //it 3
            it('Test ruta protegida', async function () {

                //Given

                //Then
                const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

                //Assert

                expect(_body.email).to.be.ok.and.eql(this.mockUser.email)
            })
    })

})