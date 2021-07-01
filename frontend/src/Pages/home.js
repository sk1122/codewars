import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { API } from "../utils/API"

import { Container, Row, Col, Form, Button, Modal, Table } from "react-bootstrap"

export default function Home() {
	
	const [rooms, setRooms] = useState([])
	const [roomName, setRoomName] = useState('')
	const [question, setQuestion] = useState('')
	const [input, setInput] = useState('')
	const [output, setOutput] = useState('')
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		let body = JSON.stringify("")
		API("/get_room", body, "GET")
		.then(res => res.json())
		.then(data => setRooms(data))
	}, [show])

	function onSubmitCreateRoom() {
		handleClose()
		let body = JSON.stringify({
			room_name: roomName,
			question: question,
			input: input,
			output: output
		})
		API("create_room", body, "POST")
		.then(res => res.json())
		.then(data => console.log(data))
	}

	return (
		<div>
		<Modal show={show} backdrop="static" onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Create Room</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>Room Name</Form.Label>
						<Form.Control type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)}></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Question</Form.Label>
						<Form.Control type="text" value={question} onChange={(e) => setQuestion(e.target.value)}></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Test Cases</Form.Label>
						<Form.Control as="textarea" rows={3} value={input} onChange={(e) => setInput(e.target.value)}></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Test Cases Output</Form.Label>
						<Form.Control as="textarea" rows={3} value={output} onChange={(e) => setOutput(e.target.value)}></Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={onSubmitCreateRoom}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>

			<Container className="d-flex justify-content-center align-items-center" style={{ height: "40vh" }}>
				<Row>
					<Col className="text-center">
						<h1>CodeWars</h1>
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Create Room</Form.Label>
								<Form.Control type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Enter Room Name"></Form.Control>
							</Form.Group>
							<Button variant="primary" onClick={handleShow}>Submit</Button>
						</Form>
					</Col>
				</Row>
			</Container>

			<Table stripped border hover>
				<thead>
					<tr>
						<th colSpan={3}>#</th>
						<th colSpan={3}>Room Name</th>
						<th>Room Id</th>
					</tr>
				</thead>
				<tbody>
					{rooms.map((room, idx) => (
						<tr>
							<td colSpan={3}>{idx}</td>
							<td colSpan={3}>{room.room_name}</td>
							<Link to={`/room/${room.id}`}><td>{room.id}</td></Link>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}