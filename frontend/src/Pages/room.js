import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Container, Button, Row, Col } from "react-bootstrap";
import SplitPane from 'react-split-pane'
import socketIOClient from 'socket.io-client'
import { toast } from "react-toastify";

import HelpBar from '../Components/HelpBar'
import Editor from '../Components/Editor'

import { API } from '../utils/API'
import { languageToAPI } from "../utils/languageToAPI"

export default function Room() {
	let { id } = useParams()

	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const [widthLeft, setWidthLeft] = useState('')
	const [widthRight, setWidthRight] = useState('')

	const [body, setBody] = useState('')
	const [inputBody, setInputBody] = useState('')
	const [outputBody, setOutputBody] = useState('')
	const [language, setLanguage] = useState('c')
	const [theme, setTheme] = useState('monokai')
	const [fontSize, setFontSize] = useState('12')
	
	const [room, setRoom] = useState({})

	const socket = socketIOClient("http://localhost:5000")

	useEffect(() => {
		socket.emit('joinroom', { roomId: id })
		socket.on('userjoined', (value) => {
			console.log('joined', value)
		})
	}, [])
	
	useEffect(() => {
		socket.on('successful submission', (data) => {
			toast.dark('Opponent Successfully Submitted')
		})

		socket.on('unsuccessful submission', (data) => {
			toast.dark('Opponent Unsuccessfully Submitted')
		})
	}, [])

	useEffect(() => {
		setLanguage(localStorage.getItem("language") == null ? "c" : localStorage.getItem("language"))
		setTheme(localStorage.getItem("theme") == null ? "monokai" : localStorage.getItem("theme"))
		setFontSize(localStorage.getItem("fontSize") == null ? "12" : localStorage.getItem("fontSize"))
	}, [])

	useEffect(() => {
		let data = JSON.stringify("")
		API(`${id}`, data, "GET")
		.then(res => res.json())
		.then(data => {
			setRoom(data)
		})
	}, [])

	function handleWidthChange(width) {
		setWidthRight((100 - width).toString())
		setWidthLeft(width.toString())
	}
	
	function handleBodyUpdate(value) {
		setBody(value)
	}
	
	function onSubmitCode() {
		let data = JSON.stringify({
			clientId: process.env.REACT_APP_CLIENT_ID,
			clientSecret: process.env.REACT_APP_CLIENT_SECRET,
			script: body,
			stdin: inputBody,
			language: languageToAPI[language].name,
			versionIndex: languageToAPI[language].version
		})

		API("run", data, "POST")
		.then(res => res.json())
		.then(data => {
			setOutputBody(data["output"])
			console.log(outputBody.trim().toLowerCase(), room["output"].trim().toLowerCase())
			if(outputBody.trim().toLowerCase() === room["output"].trim().toLowerCase()) {
				socket.emit('successful submission', { roomId: id })
			} else {
				socket.emit('unsuccessful submission', { roomId: id })
			}
		})
	}
	
	useEffect(() => {
		localStorage.setItem("language", language)
	}, [language])
	
	useEffect(() => {
		localStorage.setItem("theme", theme)
	}, [theme])
	
	useEffect(() => {
		localStorage.setItem("fontSize", fontSize)
	}, [fontSize])

	return (
		<Container style={{ margin: 0, padding: 0 }}>
			<HelpBar language={language} setLanguage={setLanguage} setTheme={setTheme} setFontSize={setFontSize}></HelpBar>
			<SplitPane
				split="vertical"
				minSize={150}
				maxSize={windowWidth - 150}
				defaultSize={windowWidth / 2}
				className="row text-center "
				style={{ height: '78vh', width: '100vw', marginRight: '0' }}
				onChange={handleWidthChange}
			>
				<div>
					<Container className="mb-1">
						<Row>
							<Col>
								<h5>Code Here</h5>
							</Col>
							<Col>
								<Button>Copy Code</Button>
							</Col>
							<Col>
								<Button onClick={onSubmitCode}>Save & Run</Button>
							</Col>
						</Row>
					</Container>
					<Editor
						language={language}
						theme={theme}
						body={body}
						setBody={handleBodyUpdate}
						width={widthLeft}
						fontSize={fontSize}
					/>
				</div>
				<div>
					<div>
						<Container className="mb-1">
							<Row>
								<Col>
									<h5>Input</h5>
								</Col>
							</Row>
						</Container>
						<Editor
							language={''}
							theme={theme}
							body={inputBody}
							setBody={setInputBody}
							width={widthRight}
							height={'35vh'}
							fontSize={fontSize}
						/>
					</div>
					<div>
						<Container className="mb-1">
							<Row>
								<Col>
									<h5>Output</h5>
								</Col>
							</Row>
						</Container>
						<Editor
							language={''}
							theme={theme}
							body={outputBody}
							setBody={setInputBody}
							width={widthRight}
							height={'39vh'}
							fontSize={fontSize}
						/>
					</div>
				</div>

			</SplitPane>
		</Container>
	)
}