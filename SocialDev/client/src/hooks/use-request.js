import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { currentUser } from "stateStore/auth/slices/authSlice";

const useRequest = ({ url, method, body }) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState(null);

	const doRequest = async () => {
		try {
			setErrors(null);
			const response = await axios[method](url, body);
			dispatch(currentUser());

			return response.data;
		} catch (err) {
			setErrors(
				<div className="alert alert-danger">
					<h4>Oooops....</h4>
					<ul className="my-0">
						{err.response.data.errors.map((err) => (
							<li key={err.message}>{err.message}</li>
						))}
					</ul>
				</div>
			);
		}
	};

	return { doRequest, errors };
};

export default useRequest;
