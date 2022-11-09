import React, { useState, useEffect } from "react";

// MUI
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// project components
import AuthDialog from "./AuthDialog";
import NavbarSearchBox from "./NavbarSearchBox";
import NavbarMessage from "./NavbarMessage";
import NavbarNotification from "./NavbarNotification";
import NavbarAvatar from "./NavbarAvatar";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

export default function Navbar({ loggedIn }) {
	const [modalShow, setModalShow] = useState(false);

	return (
		<>
			<ThemeProvider theme={darkTheme}>
				{!loggedIn && (
					<Box sx={{ flexGrow: 1 }}>
						<AppBar position="static">
							<Toolbar>
								<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
									SocialDev
								</Typography>
								<Box sx={{ flexGrow: 1 }} />
								<Box sx={{ display: { xs: "none", md: "flex" } }}>
									<Button color="inherit" onClick={() => setModalShow(true)}>
										Login
									</Button>
								</Box>
								<AuthDialog
									show={modalShow}
									onHide={() => setModalShow(false)}
								/>
							</Toolbar>
						</AppBar>
					</Box>
				)}

				{loggedIn && (
					<Box sx={{ flexGrow: 1 }}>
						<AppBar position="static">
							<Toolbar>
								<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
									SocialDev
								</Typography>

								<Box sx={{ flexGrow: 1 }} />
								<NavbarSearchBox />
								<NavbarMessage />
								<NavbarNotification />
								<NavbarAvatar setModalShow={setModalShow} />
							</Toolbar>
						</AppBar>
					</Box>
				)}
			</ThemeProvider>
		</>
		// <>
		// 	<Navbar bg="dark" variant="dark" expend="lg">
		// 		<Container fluid>
		// 			<Navbar.Brand href="/">SocialDev</Navbar.Brand>

		// 			{!loggedIn && (
		// 				<>
		// 					<Button
		// 						variant="primary"
		// 						className="justify-content-end"
		//
		// 					>
		// 						Login
		// 					</Button>
		//
		// 				</>
		// 			)}

		// 			{loggedIn && (
		// 				<>
		// 					<AppBarSearchBox />
		// 					<AppBarMessage />
		// 					<AppBarNotification />
		// 					<AppBarProfile />
		//
		// 				</>
		// 			)}
		// 		</Container>
		// 	</Navbar>
		// </>
	);
}
