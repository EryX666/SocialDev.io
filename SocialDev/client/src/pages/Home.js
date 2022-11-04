import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "stateStore/slices/authSlice";
import FeedWall from "./Feed-Wall";

const Home = () => {
	const { loggedIn } = useSelector(authSelector);

	useEffect(() => {}, [loggedIn]);
	return (
		<>
			{!loggedIn && (
				<div className="container">
					<header className="jumbotron">
						<h1>Home</h1>
					</header>
				</div>
			)}
			{loggedIn && <FeedWall />}
		</>
	);
};

export default Home;
