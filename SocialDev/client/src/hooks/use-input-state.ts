import { useState } from "react";

// @ts-ignore
const useInputState = (initialVal) => {
	const [value, setValue] = useState(initialVal);
	// @ts-ignore
	const handleChange = (evt) => {
		setValue(evt.target.value);
	};
	const reset = () => {
		setValue("");
	};
	return [value, handleChange, reset];
};

export default useInputState;
