import { body } from "express-validator";

const loginValidation = [
	body("email").isEmail().withMessage("Email must be valid"),
	body("password").trim().notEmpty().withMessage("You must supply a password"),
];

const signupValidation = [
	body("email").isEmail().withMessage("Email must be valid"),
	body("password")
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage("Password must be between 4 and 20 characters"),
];

const editProfileValidation = [
	body("handle").trim().notEmpty().withMessage("user handle cant be empty"),
	body("handle")
		.trim()
		.notEmpty()
		.isLength({ min: 4, max: 20 })
		.withMessage("user handle must be between 4 to 20 characters"),
	// body("company").isString().withMessage("company name must be a character"),
	// body("website").isString().withMessage("website must be a character"),
	// body("location").isString().withMessage("location must be a character"),
	// body("status").isString().withMessage("status must be a character"),
	// body("bio").isString().withMessage("bio must be a character"),
	// body("github").isString().withMessage("github name must be a character"),
	// body("skills").isString().withMessage("skills must be a character"),
	// body("social").isString().withMessage("social must be a character"),
];

const createPostValidation = [
	body("text").notEmpty().withMessage("Post must contain Text"),
];

const editPostValidation = [
	body("text").notEmpty().withMessage("Post must contain Text"),
];

const createCommentValidation = [
	body("text").notEmpty().withMessage("comment must contain Text"),
];

const editCommentValidation = [
	body("text").notEmpty().withMessage("comment must contain Text"),
];

export {
	loginValidation,
	signupValidation,
	editProfileValidation,
	createPostValidation,
	editPostValidation,
	createCommentValidation,
	editCommentValidation,
};
