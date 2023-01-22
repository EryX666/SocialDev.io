import React, { useState, useEffect, useRef } from "react";
// import useRequest from "../hooks/use-request";
import { useSelector, useDispatch } from "react-redux";
import {
	authSelector,
	clearState,
	userLogin,
} from "stateStore/auth/slices/authSlice";

// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

function LoginModal(props) {
	const dispatch = useDispatch();
	const { isSuccess, isFetching, isError, errorMessage } =
		useSelector(authSelector);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const cancelButtonRef = useRef(null);

	const onSubmit = async (event) => {
		event.preventDefault();
		dispatch(userLogin({ email, password }));
	};

	useEffect(() => {
		return () => {
			dispatch(clearState());
		};
	}, []);

	useEffect(() => {
		if (isError) {
			dispatch(clearState());
			console.log(isError);
			console.log(errorMessage);
		}

		if (isSuccess) {
			dispatch(clearState());
			props.onClose();
		}
	}, [isSuccess, isFetching]);

	return (
		<>
			<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<button
					type="button"
					className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
					data-modal-toggle="authentication-modal"
					onClick={() => props.onClose()}
					ref={cancelButtonRef}
				>
					<svg
						aria-hidden="true"
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
					<span className="sr-only">Close modal</span>
				</button>
				<div className="py-6 px-6 lg:px-8">
					<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
						Sign in to our platform
					</h3>
					<form className="space-y-6" action="#" onSubmit={onSubmit}>
						<div>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Your email
							</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								name="email"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="name@company.com"
								required
							/>
						</div>
						{/* {errorMessage[0].field == "email" ? (
							<span className="text-red-600 font-bold underline">
								{errorMessage[0].message}
							</span>
						) : null} */}
						<div>
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Your password
							</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required
							/>
						</div>
						{/* {errorMessage[0].field == "password" ? (
							<span className="text-red-600 font-bold underline">
								{errorMessage[0].message}
							</span>
						) : null} */}
						<div className="flex justify-between">
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="remember"
										type="checkbox"
										value=""
										className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
									/>
								</div>
								<label
									htmlFor="remember"
									className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Remember me
								</label>
							</div>
							<a
								href="/"
								className="text-sm text-blue-700 hover:underline dark:text-blue-500"
							>
								Lost Password?
							</a>
						</div>
						<button
							type="submit"
							className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Login to your account
						</button>
						<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
							Not registered?{" "}
							<a
								href="/"
								className="text-blue-700 hover:underline dark:text-blue-500"
								onClick={(e) => props.switchForms()}
							>
								Create account
							</a>
						</div>
					</form>
				</div>
			</div>
			{/* <Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form noValidate onSubmit={onSubmit}>
					<Form.Group classNameName="mb-3" controlId="formEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Enter email"
						/>
					</Form.Group>

					<Form.Group classNameName="mb-3" controlId="formPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Password"
						/>
					</Form.Group>

					<Button
						variant="primary"
						type="submit"
						onClick={async () => {
							if (isError) {
								return null;
							} else {
								return props.onHide;
							}
						}}
					>
						{/* {isFetching ? (
							<svg
								classNameName="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									classNameName="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									classNameName="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						) : null} */}
			{/* Login
					</Button> */}

			{/* onClick={props.onHide} */}
			{/* </Form> */}
			{/* </Modal.Body> */}
		</>
	);
}

export default LoginModal;
