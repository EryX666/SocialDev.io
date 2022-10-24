import React, { useState, useEffect } from "react";
import useRequest from "../../hooks/use-request";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, clearState } from "stateStore/slices/authSlice";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RegisterModal(props) {
	const dispatch = useDispatch();
	const { isSuccess } = useSelector(authSelector);
	const [handle, setHandle] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { doRequest, errors } = useRequest({
		url: "/api/auth/register",
		method: "post",
		body: {
			email,
			password,
			handle,
		},
	});

	const onSubmit = async (event) => {
		event.preventDefault();
		doRequest();
	};

	useEffect(() => {
		return () => {
			dispatch(clearState());
		};
	}, [dispatch]);

	useEffect(() => {
		if (isSuccess) {
			dispatch(clearState());
		}
	}, [isSuccess, dispatch]);

	return (
		<>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">Sign up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={onSubmit}>
					<Form.Group className="mb-3" controlId="formHandle">
						<Form.Label>User Handle</Form.Label>
						<Form.Control
							value={handle}
							onChange={(e) => setHandle(e.target.value)}
							type="text"
							placeholder="User handle"
						/>
						<Form.Text className="text-muted">
							This is the handle other users see you as
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Enter email"
						/>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Password"
						/>
					</Form.Group>
					{errors}

					<Button variant="primary" type="submit" onClick={props.onHide}>
						Register
					</Button>
				</Form>
			</Modal.Body>
		</>
	);
}

export default RegisterModal;
