/**
 * Required External Modules
 */

import express, { Request, Response } from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import http from "http"

import { router } from "./router/router"
import { connection } from "./models/connection"
import { Room } from "./models/entities/room.entity"

dotenv.config()

/**
 * App Variables
 */

if(!process.env.PORT) {
	process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const app = express()
const server = http.createServer(app);

import { Server, Socket } from 'socket.io';
const io = new Server(server, {
	cors: {
        origin: 'http://localhost:3000'
    }
});


/**
 *  App Configuration
 */

app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
        allowedHeaders: ['Content-Type'],
        origin: ['http://localhost:3000']
    })
)
app.use(express.json())
app.use("/api/v1", router)

io.on("connection", (socket: Socket) => {
    socket.on('joinroom', ({ roomId }) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('userjoined', roomId)
    })

    socket.on('successful submission', ({ roomId }) => {
        socket.broadcast.to(roomId).emit('successful submission', true)
    })

    socket.on('unsuccessful submission', ({ roomId }) => {
        socket.broadcast.to(roomId).emit('unsuccessful submission', true)
    })
})

/**
 * Server Activation
 */

server.listen(PORT, () => {
	console.log("Server Running on " + PORT)
})