import mongoose from "mongoose";

// An interface that describes the properties
// that is required to create a new Comment
interface CommentAttrs {
	id: string;
}

// An interface that describes the properties
// that a Comment Model has
interface CommentModel extends mongoose.Model<CommentDoc> {
	build(attrs: CommentAttrs): CommentDoc;
}

// An interface that describes the properties
// that a Comment Document has
interface CommentDoc extends mongoose.Document {
	id: string;
	comments: object;
}

const commentsSchema = new mongoose.Schema(
	{
		comments: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				handle: {
					type: mongoose.Schema.Types.String,
					ref: "profiles",
				},
				text: {
					type: String,
					require: true,
				},
				likes: [
					{
						user: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "users",
						},
						handle: {
							type: mongoose.Schema.Types.String,
							ref: "profiles",
						},
					},
				],
				embedded_comments: [
					{
						user: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "users",
						},
						handle: {
							type: mongoose.Schema.Types.String,
							ref: "profiles",
						},
						text: {
							type: String,
							require: true,
						},
						likes: [
							{
								user: {
									type: mongoose.Schema.Types.ObjectId,
									ref: "users",
								},
							},
						],
						date: {
							type: Date,
							default: Date.now,
						},
					},
				],
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
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

commentsSchema.statics.build = (attrs: CommentAttrs) => {
	return new Comments({
		_id: attrs.id,
	});
};

const Comments = mongoose.model<CommentDoc, CommentModel>(
	"Comments",
	commentsSchema
);

export { Comments };
