import { Message } from "node-nats-streaming";
import {
	Subjects,
	Listener,
	UserCreatedEvent,
} from "@obiproduction/socialnet-api-common";
import { Friends } from "../../models/Friends";
import { queueGroupName } from "./queue-group-name";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
	readonly subject = Subjects.UserCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: UserCreatedEvent["data"], msg: Message) {
		const { id, handle } = data;
		const friends = Friends.build({ id, ownerHandle: handle });
		await friends.save();

		msg.ack();
	}
}
