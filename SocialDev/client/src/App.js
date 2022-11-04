import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
