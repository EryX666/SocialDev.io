import { createSlice } from "@reduxjs/toolkit";
import { currentUser } from "stateStore/reducers/currentUser";
import { userLogin } from "stateStore/reducers/userLogin";
import { userRegister } from "stateStore/reducers/userRegister";

const initialState = {
	loggedIn: false,
	isSuccess: null,
	isFetching: null,
	isError: null,
	errorMessage: null,
	id: null,
	email: null,
	handle: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearState: (state) => {
			state.isSuccess = null;
			state.isFetching = null;
			state.isError = null;

			return state;
		},
	},

	extraReducers: {
		[currentUser.fulfilled]: (state, { payload }) => {
			if (payload !== null) {
				state.loggedIn = true;
				state.isFetching = false;
				state.isSuccess = true;
				state.id = payload.id;
				state.email = payload.email;
				state.handle = payload.handle;
			}
			if (payload === null) {
				state.loggedIn = false;
				state.isFetching = false;
				state.isSuccess = false;
				state.id = null;
				state.email = null;
				state.handle = null;
			}

			return state;
		},
		[currentUser.pending]: (state) => {
			state.isFetching = true;
			state.isSuccess = false;

			return state;
		},
		[currentUser.rejected]: (state, { payload }) => {
			state.isSuccess = false;
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload.message;

			return state;
		},
		[userLogin.fulfilled]: (state, { payload }) => {
			state.loggedIn = true;
			state.isFetching = false;
			state.isSuccess = true;
			state.isError = false;
			state.errorMessage = null;
			state.id = payload.id;
			state.email = payload.email;
			state.handle = payload.handle;

			return state;
		},
		[userLogin.pending]: (state) => {
			state.isFetching = true;

			return state;
		},
		[userLogin.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload;

			return state;
		},
		[userRegister.fulfilled]: (state, { payload }) => {
			state.loggedIn = true;
			state.isFetching = false;
			state.isSuccess = true;
			state.isError = false;
			state.errorMessage = null;
			state.id = payload.id;
			state.email = payload.email;
			state.handle = payload.handle;

			return state;
		},
		[userRegister.pending]: (state) => {
			state.loggedIn = false;
			state.isFetching = true;
			state.isSuccess = false;

			return state;
		},
		[userRegister.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload.message;

			return state;
		},
	},
});

export const { clearState } = authSlice.actions;

export const authSelector = (state) => state.auth;

export { currentUser, userLogin, userRegister };
