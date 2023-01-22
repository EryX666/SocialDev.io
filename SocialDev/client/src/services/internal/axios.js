import axios from "axios";

const instance = axios.create({
	baseURL: `http://localhost/api`,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

export const getAllPosts = async () => {
	return await instance.get("/posts/").then((res) => res.data);
};
