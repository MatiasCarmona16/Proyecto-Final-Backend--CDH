export const generateErrorUserInfo = (userData) => {
    return `Las credenciales se encuentran incompletas o no son validas.
    Se requiere:
    *first_name: Type String, recibido: ${userData.first_name}
    *last_name: Type String, recibido: ${userData.last_name}
    *email: Type String, recibido: ${userData.email}
    *password: Type String, recibido: ${userData.password}`
}