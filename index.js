import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { dbConnection } from './db/db.connection.js';
import { noteModel } from './db/note.model.js';
const app = express();
const server = http.createServer(app);

dbConnection()
const io = new Server(server, {
    cors: "*"
});


io.on('connection', (socket) => {
    socket.on('createNote', async (data) => {
        const { title, description } = data;
        const note = new noteModel({ title, description });
        await note.save();
        io.emit('newNote', note);
    });
    socket.on('deleteNote', async (id) => {
        await noteModel.findByIdAndDelete(id);
        io.emit('noteDeleted', id);
    });
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});