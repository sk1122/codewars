import { Form, Col } from "react-bootstrap"

export default function HelpBar({
	setLanguage,
	setTheme,
	setFontSize,
	language,
	theme,
	fontSize,
}) {
	return (
		<div className="d-flex align-items-center" style={{ height: '20vh' }}>
			<Form className="ml-5">
				<Form.Group>
					<Form.Row>
						<Col xs={1.5}>
							<Form.Control value={language} onChange={(e) => setLanguage(e.target.value)} as="select">
								<option value="c">C</option>
								<option value="cpp" selected>C++</option>
								<option value="java">Java</option>
								<option value="python">Python</option>
								<option value="kotlin">Kotlin</option>
								<option value="javascript">Javascript</option>
								<option value="rust">Rust</option>
							</Form.Control>
						</Col>
						<Col xs={1.5}>
							<Form.Control value={theme} onChange={(e) => setTheme(e.target.value)} as="select">
								<option value="monokai">Monokai</option>
								<option value="github">Github</option>
								<option value="solarized_light">Solarized-Light</option>
								<option value="solarized_dark">Solarized-Dark</option>
								<option value="dracula">Dracula</option>
								<option value="eclipse">Eclipse</option>
								<option value="tomorrow_night">Tomorrow Night</option>
								<option value="tomorrow_night_blue">Tomorrow Night Blue</option>
								<option value="xcode">XCode</option>
								<option value="ambiance">Ambiance</option>
							</Form.Control>
						</Col>
						<Col xs={1.5}>
							<Form.Control value={fontSize} onChange={(e) => setFontSize(e.target.value)} as="select">
								<option>12</option>
								<option>14</option>
								<option>16</option>
								<option>18</option>
								<option>20</option>
								<option>22</option>
								<option>24</option>
							</Form.Control>
						</Col>
					</Form.Row>
				</Form.Group>
			</Form>
		</div>
	)
}