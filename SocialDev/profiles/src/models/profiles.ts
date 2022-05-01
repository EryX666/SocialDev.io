import mongoose from "mongoose";
// Insert regular avatar

// An interface that describes the properties
// that is required to create a new Profile
interface ProfileAttrs {
	id: string;
	handle: string;
}

// An interface that describes the properties
// that a Profile Model has
interface ProfileModel extends mongoose.Model<ProfileDoc> {
	build(attrs: ProfileAttrs): ProfileDoc;
}

// An interface that describes the properties
// that a Profile Document has
interface ProfileDoc extends mongoose.Document {
	id: string;
	handle: string;
	company: string;
	website: string;
	location: string;
	status: string;
	skills: string;
	bio: string;
	githubusername: string;
	experience: object[];
	education: object[];
	social: object;
}

const profilesSchema = new mongoose.Schema(
	{
		handle: {
			type: mongoose.Schema.Types.String,
			ref: "user",
		},
		company: {
			type: String,
		},
		website: {
			type: String,
		},
		location: {
			type: String,
		},
		status: {
			type: String,
		},
		skills: {
			type: [String],
		},
		bio: {
			type: String,
		},
		githubusername: {
			type: String,
		},
		experience: [
			{
				title: {
					type: String,
				},
				company: {
					type: String,
				},
				location: {
					type: String,
				},
				from: {
					type: Date,
				},
				to: {
					type: Date,
				},
				current: {
					type: Boolean,
					default: false,
				},
				description: {
					type: String,
				},
			},
		],
		// education: [
		// 	{
		// 		_id: false,
		// 		required: false,
		// 		school: {
		// 			type: String,
		// 			required: true,
		// 		},
		// 		degree: {
		// 			type: String,
		// 		},
		// 		fieldofstudy: {
		// 			type: String,
		// 		},
		// 		from: {
		// 			type: Date,
		// 			required: true,
		// 		},
		// 		to: {
		// 			type: Date,
		// 		},
		// 		current: {
		// 			type: Boolean,
		// 		},
		// 		description: {
		// 			type: String,
		// 		},
		// 	},
		// ],
		social: {
			youtube: {
				type: String,
			},
			twitter: {
				type: String,
			},
			facebook: {
				type: String,
			},
			linkedin: {
				type: String,
			},
			instagram: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

// pre building the profile schema set the profile of the user to default
// profileSchema.pre("build", async function (done) {
// 	this.set("avatar", )
// 	done();
// });

profilesSchema.statics.build = (attrs: ProfileAttrs) => {
	return new Profiles({
		_id: attrs.id,
		handle: attrs.handle,
	});
};
const Profiles = mongoose.model<ProfileDoc, ProfileModel>(
	"Profiles",
	profilesSchema
);

export { Profiles };
