import React, { Fragment, useRef, useState, useEffect } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import { Transition, Dialog } from "@headlessui/react";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function AuthDialog() {
	const [modalShow, setModalShow] = useState(false);

	const [formToShow, setFormToShow] = useState({
		login: true,
		register: false,
	});
	const cancelButtonRef = useRef(null);

	const switchForms = () => {
		setFormToShow({
			login: !formToShow.login,
			register: !formToShow.register,
		});
	};

	useEffect(() => {}, [formToShow]);

	return (
		<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
			<Transition.Root show={modalShow} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					initialFocus={cancelButtonRef}
					onClose={setModalShow}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									{formToShow.login ? (
										<LoginModal
											// @ts-ignore
											show={formToShow.login}
											switchForms={switchForms}
											onClose={() => setModalShow(false)}
										/>
									) : (
										<RegisterModal
											// @ts-ignore
											show={formToShow.register}
											switchForms={switchForms}
											onClose={() => setModalShow(false)}
										/>
									)}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			<button
				type="button"
				className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
				onClick={() => setModalShow(true)}
			>
				Login
			</button>
			{/* <button
										type="button"
										className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									>
										<span className="sr-only">Notifications</span>
										<BellIcon className="h-6 w-6" aria-hidden="true" />
									</button> */}
			{/* 
									<Menu as="div" className="relative ml-3">
										<div>
											<Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
												<span className="sr-only">Open user menu</span>
												<img
													className="h-8 w-8 rounded-full"
													src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
													alt=""
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Your Profile
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Settings
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Sign out
														</a>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu> */}
		</div>

		// <Modal {...props} size="md" centered>
		// 	{formToShow.login && (
		// 		<>
		// 			<LoginModal onHide={props.onHide} />
		// 			<Modal.Footer>
		// 				<p>Dont have an account?</p>
		// 				<Button
		// 					variant="primary"
		// 					onClick={() => setFormToShow({ login: false, register: true })}
		// 				>
		// 					Register
		// 				</Button>
		// 			</Modal.Footer>
		// 		</>
		// 	)}

		// 	{formToShow.register && (
		// 		<>
		// 			<RegisterModal onHide={props.onHide} />
		// 			<Modal.Footer>
		// 				<p>Already have an account?</p>
		// 				<Button
		// 					variant="primary"
		// 					onClick={() => setFormToShow({ login: true, register: false })}
		// 				>
		// 					Login
		// 				</Button>
		// 				<div>
		// 					<p>
		// 						This is a demo site, you dont actually need to register, you can
		// 						just log in with: <br /> email: demo@demo.com <br /> password:
		// 						1234567890
		// 					</p>
		// 				</div>
		// 			</Modal.Footer>
		// 		</>
		// 	)}
		// </Modal>
	);
}

export default AuthDialog;
