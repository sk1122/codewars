import { Navbar, Nav, Image, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Navigation() {
	return(
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href="#home">CodeWars</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link><Link to="/">Home</Link></Nav.Link>
					<Nav.Link><Link to="/room">Join Room</Link></Nav.Link>
				</Nav>
				<Button variant="outline-success">New War</Button>
				<Image src=""></Image>
			</Navbar.Collapse>
		</Navbar>
	)
} 