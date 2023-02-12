// import { createSlice } from "@reduxjs/toolkit";
// import { currentUser } from "stateStore/auth/reducers/currentUser";
// import { userLogin } from "stateStore/auth/reducers/userLogin";
// import { userRegister } from "stateStore/auth/reducers/userRegister";

// const initialState = {
// 	loggedIn: false,
// 	isSuccess: null,
// 	isFetching: null,
// 	isError: null,
// 	errorMessage: null,
// 	id: null,
// 	email: null,
// 	handle: null,
// };

// export const authSlice = createSlice({
// 	name: "auth",
// 	initialState,
// 	reducers: {
// 		clearState: (state) => {
// 			state.isSuccess = null;
// 			state.isFetching = null;
// 			state.isError = null;

// 			return state;
// 		},
// 	},

// 	extraReducers: {
// 		[currentUser.fulfilled]: (state, { payload }) => {
// 			if (payload !== null) {
// 				state.loggedIn = true;
// 				state.isFetching = false;
// 				state.isSuccess = true;
// 				state.id = payload.id;
// 				state.email = payload.email;
// 				state.handle = payload.handle;
// 			}
// 			if (payload === null) {
// 				state.loggedIn = false;
// 				state.isFetching = false;
// 				state.isSuccess = false;
// 				state.id = null;
// 				state.email = null;
// 				state.handle = null;
// 			}

// 			return state;
// 		},
// 		[currentUser.pending]: (state) => {
// 			state.isFetching = true;
// 			state.isSuccess = false;

// 			return state;
// 		},
// 		[currentUser.rejected]: (state, { payload }) => {
// 			state.isSuccess = false;
// 			state.isFetching = false;
// 			state.isError = true;
// 			state.errorMessage = payload.message;

// 			return state;
// 		},
// 		[userLogin.fulfilled]: (state, { payload }) => {
// 			state.loggedIn = true;
// 			state.isFetching = false;
// 			state.isSuccess = true;
// 			state.isError = false;
// 			state.errorMessage = null;
// 			state.id = payload.id;
// 			state.email = payload.email;
// 			state.handle = payload.handle;

// 			return state;
// 		},
// 		[userLogin.pending]: (state) => {
// 			state.isFetching = true;

// 			return state;
// 		},
// 		[userLogin.rejected]: (state, { payload }) => {
// 			state.isFetching = false;
// 			state.isError = true;
// 			state.errorMessage = payload;

// 			return state;
// 		},
// 		[userRegister.fulfilled]: (state, { payload }) => {
// 			state.loggedIn = true;
// 			state.isFetching = false;
// 			state.isSuccess = true;
// 			state.isError = false;
// 			state.errorMessage = null;
// 			state.id = payload.id;
// 			state.email = payload.email;
// 			state.handle = payload.handle;

// 			return state;
// 		},
// 		[userRegister.pending]: (state) => {
// 			state.loggedIn = false;
// 			state.isFetching = true;
// 			state.isSuccess = false;

// 			return state;
// 		},
// 		[userRegister.rejected]: (state, { payload }) => {
// 			state.isFetching = false;
// 			state.isError = true;
// 			state.errorMessage = payload.message;

// 			return state;
// 		},
// 	},
// });

// export const { clearState } = authSlice.actions;

// export const authSelector = (state) => state.auth;

// export { currentUser, userLogin, userRegister };

// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "stateStore/store";
// import { checkCurrentUser } from "stateStore/user/reducers/currentUser";
// import { userLogin } from "stateStore/user/reducers/userLogin";
// import { userRegister } from "stateStore/user/reducers/userRegister";
// import { userSignout } from "stateStore/user/reducers/userSignout";

// export interface UserState {
// 	address: string;
// 	status: string;
// 	errorMessage: string | null;
// }

// const initialState: UserState = {
// 	address: "",
// 	status: "idle",
// 	errorMessage: null,
// };

// export const userSlice = createSlice({
// 	name: "user",
// 	initialState,
// 	reducers: {
// 		clearErrors: (state) => {
// 			state.errorMessage = null;

// 			return state;
// 		},
// 	},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(connectToWallet.pending, (state) => {
// 				state.status = "loading";
// 			})
// 			.addCase(connectToWallet.fulfilled, (state, { payload }) => {
// 				state.status = "connected";
// 				state.address = payload;
// 				state.errorMessage = null;
// 			})
// 			.addCase(connectToWallet.rejected, (state, { payload }) => {
// 				state.status = "failed";
// 				state.errorMessage = payload;
// 			});
// 		builder
// 			.addCase(checkConnection.pending, (state) => {
// 				state.status = "loading";
// 			})
// 			.addCase(checkConnection.fulfilled, (state, { payload }) => {
// 				state.status = "connected";
// 				state.address = payload;
// 			})
// 			.addCase(checkConnection.rejected, (state) => {
// 				state.status = "not connected";
// 			});
// 	},
// });

// export const { clearErrors } = userSlice.actions;

// export const selectAddress = (state: RootState) => state.user.address;
// export const selectStatus = (state: RootState) => state.user.status;

// export default userSlice.reducer;

// export { checkCurrentUser, userLogin, userRegister, userSignout };
