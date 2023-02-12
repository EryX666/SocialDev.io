import React from "react";
import { createRoot } from "react-dom/client";
import App from "App";
import { AuthProvider } from "lib/authProvider";
import { ReactQueryProvider } from "lib/queryProvider";

const container = document.getElementById("app");
const root = createRoot(container as HTMLElement);
root.render(
	<React.StrictMode>
		<ReactQueryProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ReactQueryProvider>
	</React.StrictMode>
);
