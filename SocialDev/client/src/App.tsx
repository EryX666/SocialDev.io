import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "lib/authProvider";

import Navbar from "layouts/Navbar/base/Navbar";
import Home from "pages/Home";
import FeedWall from "pages/FeedWall";

import "assets/css/App.css";

function App() {
	const { currentUser, updateCurrentUser } = useContext(AuthContext);

	useEffect(() => {}, [updateCurrentUser]);

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={currentUser?.currentUser ? <FeedWall /> : <Home />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
