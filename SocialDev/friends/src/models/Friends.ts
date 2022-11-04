import mongoose from "mongoose";

// An interface that describes the properties
// that is required to create a new Friends
interface FriendsAttrs {
	id: string;
	ownerHandle: string;
}

// An interface that describes the properties
// that a Friends Model has
interface FriendsModel extends mongoose.Model<FriendsDoc> {
	build(attrs: FriendsAttrs): FriendsDoc;
}

// An interface that describes the properties
// that a Friends Document has
interface FriendsDoc extends mongoose.Document {
	id: string;
	ownerHandle: string;
	sentRequests: object[];
	receivedRequests: object[];
	friendsList: object[];
}

const friendsSchema = new mongoose.Schema(
	{
		ownerHandle: {
			type: mongoose.Schema.Types.String,
			ref: "users",
		},
		sentRequests: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				toUserId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				toUserHandle: {
					type: mongoose.Schema.Types.String,
					ref: "users",
				},
				status: {
					type: String,
					default: "waiting",
					enum: ["accepted", "rejected", "waiting"],
				},
				sentOnDate: {
					type: Date,
					default: Date.now,
				},
			},
		],
		receivedRequests: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				fromUserId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				fromUserHandle: {
					type: mongoose.Schema.Types.String,
					ref: "users",
				},
				status: {
					type: String,
					default: "waiting",
					enum: ["accepted", "rejected", "waiting"],
				},
				sentOnDate: {
					type: Date,
					default: Date.now,
				},
			},
		],
		friendsList: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
				},
				friendId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "users",
					required: true,
				},
				friendHandle: {
					type: mongoose.Schema.Types.String,
					ref: "users",
					required: true,
				},
				friendsSince: {
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

friendsSchema.statics.build = (attrs: FriendsAttrs) => {
	return new Friends({ _id: attrs.id, ownerHandle: attrs.ownerHandle });
};

const Friends = mongoose.model<FriendsDoc, FriendsModel>(
	"Friends",
	friendsSchema
);

export { Friends, FriendsDoc, FriendsModel, FriendsAttrs };
