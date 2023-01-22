import React /*, { useEffect } */ from "react";
import { getRelativeTime } from "utils/time";

const Post = ({ post }) => {
	const { handle, createdAt, text } = post;
	// 	const { handle, createdAt, likes, text, updatedAt, user } = post;
	const createdAtRelative = getRelativeTime(createdAt);
	console.log(createdAtRelative);

	return (
		<div className="flex flex-col text-black container max-w-2xl p-6 bg-gray-400 rounded-lg shadow bg-secondary-color dark:border-gray-700 my-6">
			<div className="flex pt-1 mb-3 flex-row ">
				<img
					src="/assets/avatar-image/2.jpg"
					alt="user avatar"
					className=" w-12 h-12 rounded-full"
				/>
				<div className="flex-grow pl-3 pr-3">
					<div className="ml-auto">
						<strong>
							<span className="text-[15px] font-semibold leading-5">
								{handle}
							</span>
						</strong>
					</div>
					<div className="">
						<span className="text-[13px] font-normal leading-4 break-words text-start text-gray-500">
							{createdAtRelative.visible}
						</span>
					</div>
				</div>
			</div>
			<div id="post__contentArea">
				<span className="text-[15px] font-normal leading-5 text-start whitespace-pre-wrap break-words">
					{text}
				</span>
			</div>

			<div className="border-t border-black">
				<div className="flex flex-grow m-auto">
					<button>Like</button>
					<button>Comment</button>
				</div>
			</div>
		</div>
	);
};

export default Post;
