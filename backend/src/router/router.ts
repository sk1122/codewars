import express, { Request, Response } from "express"
import fetch from "node-fetch"
import { connection } from "../models/connection"
import { Room } from "../models/entities/room.entity"

import { runCode } from "./interface/runCode.interface"

export const router = express.Router()

router.post("/run/", (req: Request, res: Response) => {
	// Run Code

	const body: runCode = req.body
	fetch("https://api.jdoodle.com/v1/execute", {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json"
		}
	})
	.then(res => res.json())
	.then(data => {
		res.json(data)
	})
})


router.get('/get_room', (req: Request, res: Response) => {
	connection
	.then(async connection => {
		const rooms: Room[] = await connection.manager.find(Room)
		res.json(rooms)
	})
	.catch(err => {
		console.error("Error ", err)
		res.json(err)
	})
})

router.post("/create_room/", (req: Request, res: Response) => {
	connection
	.then(async connection => {
		let body = req.body
		let room = new Room()
		room.room_name = body.room_name
		room.question = body.question
		room.input = body.input
		room.output = body.output

		await connection.manager.save(room)
		res.json("Successfully Created")
	})
	.catch(err => {
		res.send(err)
	})
})

router.get("/:id/", (req: Request, res: Response) => {
	let id = req.params.id

	connection
	.then(async connection => {
		const room: any = await connection
								.getRepository(Room)
								.createQueryBuilder("room")
								.where("room.id = :room_id", { room_id: id })
								.getOne();
		res.send(room)	
	})
	.catch(err => {
		res.send(err)
	})
})