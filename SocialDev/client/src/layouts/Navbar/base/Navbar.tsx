import React, { useEffect, useContext } from "react";
import { AuthContext } from "lib/authProvider";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";

import AuthDialog from "layouts/Navbar/modals/AuthDialog";
import LoggedInNavbar from "layouts/Navbar/base/LoggedInNavbar";

/* 
base Navbar only needs to handle the change in logged-in or not? and its style and what to show wether a user is logged in or not

all dialog/modal logic should be moved to modals/AuthDialog.js
*/

const Navbar: React.FC = () => {
	const { currentUser, updateCurrentUser } = useContext(AuthContext);

	useEffect(() => {}, [currentUser]);

	return (
		<>
			<Disclosure as="nav" className="bg-gray-800 block">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-none px-2 sm:px-6 lg:px-8">
							<div className="relative flex h-16 items-center justify-between">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">
											Open main menu
										</span>
										{open ? (
											<XMarkIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<Bars3Icon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</Disclosure.Button>
								</div>
								<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
									<div className="flex flex-shrink-0 items-center">
										<div className="text-5xl font-sans font-black tracking-tighter">
											<span className="bg-clip-text text-transparent bg-logo">
												<Link to="/">SocialDev</Link>
											</span>
										</div>
									</div>
									<div className="hidden sm:ml-6 sm:block">
										<div className="flex space-x-4">
											{/* {navigation.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className={classNames(
														item.current
															? "bg-gray-900 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"px-3 py-2 rounded-md text-sm font-medium"
													)}
													aria-current={item.current ? "page" : undefined}
												>
													{item.name}
												</a>
											))} */}
										</div>
									</div>
								</div>
								{currentUser?.currentUser ? (
									<LoggedInNavbar />
								) : (
									// @ts-ignore
									<AuthDialog modalShow />
								)}
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="space-y-1 px-2 pt-2 pb-3">
								{/* {navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"block px-3 py-2 rounded-md text-base font-medium"
										)}
										aria-current={item.current ? "page" : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))} */}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			{/* <ThemeProvider theme={darkTheme}>
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
		</> */}
			{/* // <>
		// 	<Navbar bg="dark" variant="dark" expend="lg">
		// 		<Container fluid>
		// 			<Navbar.Brand href="/">SocialDev</Navbar.Brand>

		// 			{!loggedIn && (
		// 				<>
		// 					<Button
		// 						variant="primary"
		// 						classNameName="justify-content-end"
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
    </Navbar> */}
		</>
	);
};

export default Navbar;
