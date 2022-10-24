import React, { useState, useEffect } from "react";
// import useRequest from "../hooks/use-request";
import { useSelector, useDispatch } from "react-redux";
import {
	authSelector,
	clearState,
	userLogin,
} from "stateStore/slices/authSlice";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginModal(props) {
	const dispatch = useDispatch();
	const { isSuccess, isFetching, isError } = useSelector(authSelector);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
		}

		if (isSuccess) {
			dispatch(clearState());
		}
	}, [isSuccess, isFetching]);

	return (
		<>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form noValidate onSubmit={onSubmit}>
					<Form.Group className="mb-3" controlId="formEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Enter email"
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formPassword">
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
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						) : null} */}
						Login
					</Button>

					{/* onClick={props.onHide} */}
				</Form>
			</Modal.Body>
		</>
	);
}

export default LoginModal;
