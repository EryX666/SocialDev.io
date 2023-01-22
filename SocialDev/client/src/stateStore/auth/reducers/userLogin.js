import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
	"auth/login",
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await axios.post("/api/auth/signin", {
				email,
				password,
			});
			let { data } = await response;

			if (response.status === 200) {
				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.errors);
		}
	}
);
