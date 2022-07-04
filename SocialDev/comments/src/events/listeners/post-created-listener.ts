import { Message } from "node-nats-streaming";
import { Subjects, Listener, PostCreatedEvent } from "socialdev-common";
import { Comments } from "../../models/comments";
import { queueGroupName } from "./queue-group-name";

export class PostCreatedListener extends Listener<PostCreatedEvent> {
	readonly subject = Subjects.PostCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: PostCreatedEvent["data"], msg: Message) {
		const { id } = data;
		const newCommentSection = await Comments.build({ id });
		await newCommentSection.save();

		msg.ack();
	}
}
