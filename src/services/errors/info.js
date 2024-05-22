export const generateErrorUserInfo = (userData) => {
    return `Las credenciales se encuentran incompletas o no son validas.
    Se requiere:
    *first_name: Type String, recibido: ${userData.first_name}
    *last_name: Type String, recibido: ${userData.last_name}
    *email: Type String, recibido: ${userData.email}
    *Password is required`
}

export const generateErrorProductsInfo = (dataProd) => {
    return  `Las credenciales se encuentran incompletas o no son validas.
    Se requiere:
    *Title: Type String, recibido: ${dataProd.title}
    *Description: Type String, recibido: ${dataProd.description}
    *Price: Type String, recibido: ${dataProd.price}
    *Category: Type String, recibido: ${dataProd.category}
    *Stock: Type String, recibido: ${dataProd.stock}
    *Code: Type String, recibido: ${dataProd.code}`
}

export const generateErrorQuantityCartInfo = (quantity) => {
    return `Se esta queriendo agregar al producto sin especificar una cantidad de dicho producto al carrito, se recibio: ${quantity}`
}