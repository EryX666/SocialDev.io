import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

export const queryClient = new QueryClient({
	logger: {
		log: (...args) => {
			console.log(
				`%c%s`,
				"color: Black; font-weight:bold; background-color: LimeGreen;",
				"[react-query]:",
				`${new Date().toLocaleTimeString()} |`,
				...args
			);
		},
		warn: (...args) => {
			// Log warning
			console.log(
				`%c%s`,
				"color: Black; font-weight:bold; background-color: Yellow;",
				"[react-query]:",
				`${new Date().toLocaleTimeString()} |`,
				...args
			);
		},
		error: (...args) => {
			console.log(...args);
			// Log error
			console.log(
				`%c%s`,
				"color: White; font-weight:bold; background-color: Red;",
				"[react-query]:",
				`${new Date().toLocaleTimeString()} |`,
				...args
			);
		},
	},
});

interface Props {
	children: React.ReactNode;
}

export const ReactQueryProvider = ({ children }: Props): JSX.Element => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			{children}
		</QueryClientProvider>
	);
};
