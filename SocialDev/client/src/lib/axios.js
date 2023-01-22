import axios from "axios";

/* 
    All internal API calls made with axios
*/

export const axiosRequest = axios.create({
	baseURL: "https://localhost:3000/api",
});

/* 
    Auth endpoint
*/
export async function getCurrentUser() {
	const req = await axiosRequest.get("/auth/currentuser");
	return req;
}

export async function postRegister() {
	const req = await axiosRequest.get("/auth/register");
	return req;
}

export async function postSignin() {
	const req = await axiosRequest.get("/auth/signin");
	return req;
}

export async function postSignout() {
	const req = await axiosRequest.get("/auth/signout");
	return req;
}
