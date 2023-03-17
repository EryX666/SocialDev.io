import { useState, createContext, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { queryClient } from "lib/queryProvider";
import zod from "zod";

interface currentUser {
	currentUser: {
		id: string;
		email: string;
		handle: string;
		iat: number;
	} | null;
}

interface AuthContext {
	currentUser: currentUser | null;
	updateCurrentUser: (onClose: React.ComponentProps<any>) => void | undefined;
	signOut: () => void | undefined;
	signIn: (
		email: string,
		password: string
	) => void | undefined | Promise<void> | Promise<unknown> | Promise<any>;
	register: (
		email: string,
		password: string,
		handle: string
	) => void | undefined;
}

export const AuthContext = createContext<AuthContext>({
	currentUser: null,
	updateCurrentUser: () => {},
	signOut: () => {},
	signIn: () => {},
	register: () => {},
});

export function AuthProvider({ children }: any): JSX.Element {
	const [currentUser, setCurrentUser] = useState<currentUser | null>();
	const logger = queryClient.getLogger();

	// // check for cookies of session
	// if (Cookies.get("session")) {
	// console.log("session cookie found");
	// } else {
	// 	console.log("no session cookie found");
	// }

	const { data, refetch } = useQuery(
		["currentUser-query"],
		async () => {
			const res = await (await fetch("/api/auth/currentuser")).json();
			return res;
		},
		{
			onError: (err) => {
				logger.log("error: ", err);
			},
			onSuccess(data) {
				logger.log("success: ", data);
				setCurrentUser(data);
				return data;
			},
		}
	);

	const updateCurrentUser = () => {
		refetch().then((data) => {
			logger.log(data);
			if (!data.error) {
				const { currentUser } = data;
				setCurrentUser(currentUser);
			} else {
				logger.log(data.error);
			}
		});
	};

	const signOut = useMutation({
		mutationFn: async () => {
			const res = await (
				await fetch("/api/auth/signout", { method: "POST" })
			).json();
			return res;
		},
		onError: (err) => {
			logger.log("error: ", err);
		},
		onSuccess: (data) => {
			logger.log("success: ", data);
			setCurrentUser(null);
		},
	});

	const signIn = useMutation({
		mutationFn: async (variables: { email: string; password: string }) => {
			const response = await await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(variables),
			});

			if (response.status === 200) {
				const data = await response.json();
				return { data };
			} else {
				const error = await response.json();
				return { error };
			}
		},
		onError: (error) => {
			console.log("there was an error submitting the mutation", error);
		},
		onSuccess: (data) => {
			console.log("this is the data returned from the mutation", data);
			updateCurrentUser();
		},
	});

	const register = useMutation({
		mutationFn: async (variables: {
			email: string;
			password: string;
			handle: string;
		}) => {
			const response = await await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(variables),
			});

			if (response.status === 201) {
				const data = await response.json();
				return { data };
			} else {
				const error = await response.json();
				return { error };
			}
		},
		onError: (error) => {
			console.log("there was an error submitting the mutation", error);
		},
		onSuccess: (data) => {
			console.log("this is the data returned from the mutation", data);
			updateCurrentUser();
		},
	});

	const value = useMemo(
		() => ({ currentUser, updateCurrentUser, signOut, signIn, register }),
		[currentUser, updateCurrentUser, signOut, signIn, register]
	);

	AuthContext.displayName = "AuthContext";

	console.log("inside auth context: ", currentUser);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
