import React, { useState, useEffect } from "react";
import Post from "layouts/Feed/components/Post";
import { getAllPosts } from "services/internal/axios";

const Posts = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		getAllPosts().then((data) => {
			setData(data);
		});
	}, []);

	if (data === null) {
		return <div>Loading Posts...</div>;
	}

	return (
		<>
			<div className="py-6">
				{data.map((post) => (
					<Post key={post.id} post={post} />
				))}
			</div>
		</>
	);
};

export default Posts;
