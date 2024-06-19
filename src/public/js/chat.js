// const socket = io ();

// socket.on ('mensaje-all', (data) => {
//     console.log(data)
//     render(data) //funcion render
//     let chat = document.getElementById('chatbox')
//     chat.scrollTop = chat.scrollHeight //mantiene el chat scroleado mostrando lo ultimo
// })

// const render = (data) => {
//     const html = data.map(elem => {
//         return (
//             `
//             <div>
//                 <strong>${elem.author} dice: </strong><em>${elem.text}</em>
//             </div>
//             `
//         )
//     }).join(' ')
//     document.getElementById('chatbox').innerHTML = html
// }

// const addMessage = () => {
//     const msg = {
//         author: document.getElementById('username').value,
//         text: document.getElementById('texto').value ,
//     }
//     socket.emit('nuevo-mensaje', msg)
//     return false
// }