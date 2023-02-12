import React from "react";
import Posts from "layouts/Feed/base/Posts";
import CreateNewPost from "layouts/Feed/base/CreateNewPost";

function FeedWall() {
	return (
		<div className="flex flex-col items-center justify-center p-6 mt-6 h-full">
			<CreateNewPost />
			<Posts />
		</div>
	);
}

export default FeedWall;
