import React from "react";
import Post from "layouts/Feed/components/Post";
import { useGetAllPosts } from "services/internal/postQueries";

const Posts: React.FC = () => {
	const postsQuery = useGetAllPosts();

	if (postsQuery.isLoading) {
		return <div>Loading Posts...</div>;
	}

	if (postsQuery.error) {
		return <div>Error: {postsQuery.error.message}</div>;
	}

	return (
		<>
			<div className="flex flex-col justify-center items-center h-full">
				{postsQuery.data.posts.map((post) => (
					<Post key={post.id} post={post} />
				))}
			</div>
		</>
	);
};

export default Posts;
