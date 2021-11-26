import { createConnection, Connection } from "typeorm"
import { Room } from "./entities/room.entity"

export const connection = createConnection({
    type: "postgres", 
    host: "localhost",
    port:  5432, // default port of postgres
    username: "sk1122", // our created username, you can have your own user name
    password: "satyam#789", // our created username, you can have your own password
    database: "codewars", // our created database name, you can have your own
    entities: [
		  Room
    ],
    synchronize: true,
    logging: false
});