export const generateErrorUserInfo = (user) => {
    return `Las credenciales se encuentran incompletas o no son validas.
    Se requiere:
    *first_name: Type String, recibido: ${user.first_name}
    *las_name: Type String, recibido: ${user.last_name}
    *email: Type String, recibido: ${user.email}`
}