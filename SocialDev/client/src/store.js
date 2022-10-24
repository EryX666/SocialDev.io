import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "stateStore/slices/authSlice";

export default configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
	middleware: (getDefauktMiddleware) => getDefauktMiddleware(),
});
