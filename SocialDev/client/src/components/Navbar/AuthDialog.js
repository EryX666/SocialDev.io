import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function AuthDialog(props) {
	const [formToShow, setFormToShow] = useState({
		login: true,
		register: false,
	});

	useEffect(() => {}, [formToShow]);

	return (
		<Modal {...props} size="md" centered>
			{formToShow.login && (
				<>
					<LoginModal onHide={props.onHide} />
					<Modal.Footer>
						<p>Dont have an account?</p>
						<Button
							variant="primary"
							onClick={() => setFormToShow({ login: false, register: true })}
						>
							Register
						</Button>
					</Modal.Footer>
				</>
			)}

			{formToShow.register && (
				<>
					<RegisterModal onHide={props.onHide} />
					<Modal.Footer>
						<p>Already have an account?</p>
						<Button
							variant="primary"
							onClick={() => setFormToShow({ login: true, register: false })}
						>
							Login
						</Button>
						<div>
							<p>
								This is a demo site, you dont actually need to register, you can
								just log in with: <br /> email: demo@demo.com <br /> password:
								1234567890
							</p>
						</div>
					</Modal.Footer>
				</>
			)}
		</Modal>
	);
}

export default AuthDialog;
