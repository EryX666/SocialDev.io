import React from "react";

const Avatar: React.FC = () => {
	return (
		<div>
			<img
				src="/avatar-image-example.jpg"
				alt="user avatar"
				className=" w-12 h-12 rounded-full"
			/>
		</div>
	);
};

export default Avatar;
