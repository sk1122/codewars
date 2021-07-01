import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { uuid } from "uuidv4";

@Entity()
export class Room {
	@PrimaryGeneratedColumn("uuid")
		public id: string;

	@Column()
		public room_name: string;

	@Column()
		public question: string;
	
	@Column()
		public input: string;
	
	@Column()
		public output: string;
}