
const socket = io()

socket.on('mensaje', (data)=> {
    console.log(data)
})