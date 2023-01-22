import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "layouts/Navbar/base/Navbar";
import Home from "pages/Home";
import FeedWall from "pages/FeedWall";

import "assets/css/App.css";

import { useSelector, useDispatch } from "react-redux";
import { authSelector, currentUser } from "stateStore/auth/slices/authSlice";

function App() {
	const dispatch = useDispatch();
	const { loggedIn, isFetching, isSuccess } = useSelector(authSelector);
	// TODO: add error handling based on isError
	// const { loggedIn, isFetching, isError, isSuccess } = useSelector(authSelector);

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
				<Route exact path="/" element={loggedIn ? <FeedWall /> : <Home />} />
			</Routes>
		</Router>
	);
}

export default App;
