const socket = io()

socket.on('mensaje', (data)=> {
    console.log(data)

    socket.emit('productos', 'Lista de productos')
})

const addProduct = () => {
    const prods = {
        nombre: '',
        text: '',
    }
}