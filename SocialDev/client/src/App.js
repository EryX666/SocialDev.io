import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";

import "./styles/App.css";

import { useSelector, useDispatch } from "react-redux";
import { authSelector, currentUser } from "stateStore/slices/authSlice";

function App() {
	const dispatch = useDispatch();
	const { loggedIn, isFetching, isError, isSuccess } =
		useSelector(authSelector);

	useEffect(() => {
		dispatch(currentUser());
	}, []);

	useEffect(() => {
		if (isFetching) {
			console.log("fetching current user");
		}
		if (isSuccess) {
			console.log("success in getting current user");
		}
	}, [isFetching, isSuccess]);

	return (
		<Router>
			<Navbar loggedIn={loggedIn} />
			<Routes>
				<Route exact path="/" element={<Home loggedIn={loggedIn} />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
