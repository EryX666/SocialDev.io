import express, { Request, Response } from "express";
import { Profiles } from "../models/profiles";
import {
	requireAuth,
	validateRequest,
} from "@obiproduction/socialnet-api-common";
import { editProfileValidation } from "../utilities/validation/validate";

const router = express.Router();

// Route        ---> PUT api/profile/edit
// Description  ---> Edit the current user profile
// Access       ---> Private
// Roles        ---> The profile.userId = currentUser.Id and ADMIN
router.put(
	"/edit",
	requireAuth,
	editProfileValidation,
	validateRequest,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;

		const {
			handle,
			company,
			website,
			location,
			status,
			bio,
			github,
			// education,
			skills,
			facebook,
			twitter,
			linkedin,
			instagram,
		} = req.body;

		const profileFields = {
			handle,
			company,
			website,
			location,
			status,
			bio,
			github,
			skills,
			social: {
				facebook: undefined,
				twitter: undefined,
				linkedin: undefined,
				instagram: undefined,
			},
			// education: {
			// 	school: undefined,
			// 	degree: undefined,
			// 	fieldofstudy: undefined,
			// 	from: undefined,
			// 	to: undefined,
			// 	current: undefined,
			// 	description: undefined,
			// },
		};

		if (handle) profileFields.handle = handle;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (status) profileFields.status = status;
		if (bio) profileFields.bio = bio;
		if (github) profileFields.github = github;
		if (typeof skills !== undefined) {
			profileFields.skills = skills.replace(/ /g, ",").split(",");
		}
		// if (typeof education !== undefined) {
		// 	if (education.school) profileFields.education.school = education.school;
		// 	if (education.degree) profileFields.education.degree = education.degree;
		// 	if (education.fieldofstudy)
		// 		profileFields.education.fieldofstudy = education.fieldofstudy;
		// 	if (education.from) profileFields.education.from = education.from;
		// 	if (education.to) profileFields.education.to = education.to;
		// 	if (education.current)
		// 		profileFields.education.current = education.current;
		// 	if (education.description)
		// 		profileFields.education.description = education.description;
		// }

		if (facebook) profileFields.social.facebook = facebook;
		if (twitter) profileFields.social.twitter = twitter;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		const profile = await Profiles.findOneAndUpdate(
			{ _id: userId },
			// @ts-ignore
			{ $set: profileFields },
			{ returnOriginal: false }
		);

		res.status(201).json(profile);
	}
);

// Route        ---> POST api/profile/experience/add
// Description  ---> Add new experience
// Access       ---> Private
// Roles        ---> The profile.userId = currentUser.Id and ADMIN
router.post(
	"/experience/add",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;
		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		} = req.body.experience;

		const experience = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};
		if (title) experience.title = title;
		if (company) experience.company = company;
		if (location) experience.location = location;
		if (from) experience.from = from;
		if (to) experience.to = to;
		if (current) experience.current = current;
		if (description) experience.description = description;

		const profile = await Profiles.findOneAndUpdate(
			{ _id: userId },
			{ $push: { experience } },
			{ returnOriginal: false }
		);

		res.status(201).json(profile);
	}
);

// Route        ---> PUT /api/profile/experience/:experience_id/edit
// Description  ---> Edit an experience based on its id
// Access       ---> Private
// Roles        ---> The profile.userId = currentUser.Id and ADMIN
router.put(
	"/experience/:experience_id/edit",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;
		const { experience_id: expId } = req.params;

		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		} = req.body;

		const newExperience = {
			_id: "",
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};
		newExperience._id = expId;
		if (title) newExperience.title = title;
		if (company) newExperience.company = company;
		if (location) newExperience.location = location;
		if (from) newExperience.from = from;
		if (to) newExperience.to = to;
		if (current) newExperience.current = current;
		if (description) newExperience.description = description;

		const EditProfileExperience = await Profiles.findOneAndUpdate(
			{
				_id: userId,
				"experience._id": expId,
			},
			{ $set: { "experience.$": newExperience } },
			{ multi: true, returnOriginal: false }
		);

		res.status(201).json(EditProfileExperience);
	}
);

// Route        ---> POST /api/profile/experience/:experience_id/delete
// Description  ---> Delete experience based on its ID
// Access       ---> Private
// Roles        ---> The profile.userId = currentUser.Id and ADMIN
router.delete(
	"/experience/:experience_id/delete",
	requireAuth,
	async (req: Request, res: Response) => {
		const { id: userId } = req.currentUser!;
		const { experience_id: expId } = req.params;

		await Profiles.updateOne(
			{ _id: userId },
			{
				$pull: { experience: { _id: expId } },
			}
		);

		const NewProfile = await Profiles.findById(userId);

		res.status(201).json(NewProfile);
	}
);

export { router as EditProfileRouter };
