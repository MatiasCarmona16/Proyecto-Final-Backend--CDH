import { UserManager } from "../dao/mongodb/managers/user.managerDB.js";

const userc = new UserManager()

export class UserService {
    async createUserService({ first_name, last_name, age, email,role, password }){
        return await userc.createUser({ first_name, last_name, age, email,role, password })
    }

    async findUserEmailService(email){
        return await userc.findUserEmail(email)
    }

    async findUserUsernameService(username){
        return await userc.findUserUsername(username)
    }

    async findUserIdService(id){
        return await userc.findUserId(id)
    }

    async findCartIdbyUserService(cartId){
        return await userc.findCartIdbyUser(cartId)
    }

    async getUserByResetTokenService(token){
        return await userc.getUserByResetToken(token)
    }
}
