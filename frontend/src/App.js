import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navigation from "./Components/Navigation";
import Room from './Pages/room'
import Home from './Pages/home'

import "bootstrap/dist/css/bootstrap.css";

export default function App (){
	return (
		<>
			<Router>
				<Navigation></Navigation>
				<Switch>
					<Route path="/room/:id">
						<Room></Room>
					</Route>
					<Route path="/">
						<Home></Home>
					</Route>
				</Switch>
				
			</Router>
			<ToastContainer></ToastContainer>
		</>
	)
}