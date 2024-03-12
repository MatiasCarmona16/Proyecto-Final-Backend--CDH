import bcrypt from 'bcryptjs'

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const isValidatePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export { createHash, isValidatePassword }