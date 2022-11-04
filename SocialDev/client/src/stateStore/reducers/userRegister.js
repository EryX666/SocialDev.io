import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
	"auth/register",
	async ({ handle, email, password }, thunkAPI) => {
		try {
			// const response = await axios.get("/api/auth/currentuser");
			// let data = await response.data.currentUser;
			// return data;
		} catch (e) {
			// console.log("Error", e);
		}
	}
);
