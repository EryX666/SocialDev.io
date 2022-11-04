import mongoose from "mongoose";
// TODO: in event-bus call comment model and build it after building post
// import { Comments } from "./Comments";

// An interface that describes the properties
// that is required to create a new Profile
interface PostAttrs {
	text: string;
}

// An interface that describes the properties
// that a Profile Model has
interface PostModel extends mongoose.Model<PostDoc> {
	build(attrs: PostAttrs): PostDoc;
}

// An interface that describes the properties
// that a Profile Document has
interface PostDoc extends mongoose.Document {
	user: string;
	text: string;
	handle: string;
	likes: object[];
	date: Date;
}

const postsSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		text: {
			type: String,
			required: true,
		},
		handle: {
			type: mongoose.Schema.Types.String,
			ref: "profiles",
		},
		likes: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
			},
		],
		comment_section: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "comments",
		},
		date: {
			type: Date,
			default: Date.now,
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

// TODO: pre save of post emit to even-bus to creat a comment section
// postsSchema.pre("save", async function (done) {
// 	const CreateCommentsSection = await Comments.build(this._id);
// 	await CreateCommentsSection.set("post_ref", this._id);
// 	await CreateCommentsSection.save();
// 	this.set("comment_section", CreateCommentsSection._id);

// 	done();
// });

postsSchema.statics.build = (attrs: PostAttrs) => {
	return new Posts(attrs);
};

const Posts = mongoose.model<PostDoc, PostModel>("Posts", postsSchema);

export { Posts };
