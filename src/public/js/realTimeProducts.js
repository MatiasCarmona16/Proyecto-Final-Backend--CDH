const socket = io()

socket.on('mensaje', (data)=> {
    console.log(data)

    socket.emit('productos', 'Lista de productos')//socket.emit: Enviar mensaje
})

const addProduct = () => {
    const prods = {
        nombre: '',
        text: '',
    }
}