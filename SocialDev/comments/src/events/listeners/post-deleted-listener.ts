import { Message } from "node-nats-streaming";
import {
	Subjects,
	Listener,
	PostDeletedEvent,
} from "@obiproduction/socialnet-api-common";
import { Comments } from "../../models/comments";
import { queueGroupName } from "./queue-group-name";

export class PostDeletedListener extends Listener<PostDeletedEvent> {
	readonly subject = Subjects.PostDeleted;
	queueGroupName = queueGroupName;

	async onMessage(data: PostDeletedEvent["data"], msg: Message) {
		const { id } = data;
		await Comments.deleteOne({ _id: id });

		msg.ack();
	}
}
