import { Server } from "socket.io";
import { MessageSchema } from "../dao/mongodb/models/chat.schema.js";

export function setupSocket(server) {
    //Socket Server
    const io = new Server(server);

    io.on('connection', async (socket) => {

        const messages = await MessageSchema.find().sort({ timestamp: 1 });
        socket.emit('chat history', messages);

        socket.on('chat message', async (msg) => {
            const chatMessage = new MessageSchema({ user: msg.user, message: msg.message });
            await chatMessage.save();

            io.emit('chat message', chatMessage);
        });

        socket.on('disconnect', () => {
            
        });
    });
}