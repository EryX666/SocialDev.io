import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "lib/queryProvider";
// import zod from "zod"; TODO: add zod validation

type userPosts = {
	posts: {
		id: string;
		date: string;
		text: string;
		handle: string;
		user: string;
		likes: string[];
		createdAt: string;
		updatedAt: string;
	}[];
};

const logger = queryClient.getLogger();

export const getAllPosts = async (): Promise<userPosts> => {
	const data: userPosts = await (await fetch("/api/posts/")).json();
	return data;
};

export const useGetAllPosts = () => {
	const query = useQuery<userPosts, Error>({
		queryKey: ["allPosts-query"],
		queryFn: getAllPosts,
		onSuccess: (data) => {
			logger.log("success: ", data);
		},
		onError: (error) => {
			logger.log("error: ", error);
		},
	});

	return query;
};

export const createNewPost = async (data: { text: string }) => {
	const res = await fetch("/api/posts/create", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!res.ok) {
		const error = await res.json();
		console.log(error);
		throw new Error(error);
	}
	return res.json();
};

export const useCreateNewPost = () => {
	const mutation = useMutation({
		mutationKey: ["createNewPost-mutation"],
		mutationFn: createNewPost,
		onSuccess: (data) => {
			logger.log("success: ", data);
			queryClient.invalidateQueries({ queryKey: ["allPosts-query"] });
		},
		onError: (error) => {
			logger.log("error: ", error);
		},
	});

	return mutation;
};
