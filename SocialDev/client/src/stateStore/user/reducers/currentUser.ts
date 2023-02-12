// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getCurrentUser } from "services/internal/userQueries";

// export const checkCurrentUser = createAsyncThunk<
// 	string,
// 	void,
// 	{ rejectValue: any }
// >("user/checkCurrentUser", async (_, { rejectWithValue }) => {
// 	try {
// 		const res = await getCurrentUser();
// 		console.log(res);
// 		return res;
// 		// const accounts = await ethereum.request({
// 		// 	method: "eth_accounts",
// 		// });
// 		// if (accounts.length !== 0) {
// 		// 	return accounts[0];
// 		// } else {
// 		// 	return rejectWithValue("not connected");
// 		// }
// 	} catch (e: any) {
// 		return rejectWithValue(e.message);
// 	}
// });

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const currentUser = createAsyncThunk("auth/currentUser", async () => {
// 	try {
// 		const response = await axios.get("/api/auth/currentuser");
// 		let data = await response.data.currentUser;

// 		return data;
// 	} catch (e) {
// 		console.log("Error", e);
// 	}
// });
