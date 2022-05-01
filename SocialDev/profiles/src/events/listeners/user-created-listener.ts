import { Message } from "node-nats-streaming";
import {
	Subjects,
	Listener,
	UserCreatedEvent,
} from "@obiproduction/socialnet-api-common";
import { Profiles } from "../../models/profiles";
import { queueGroupName } from "./queue-group-name";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
	readonly subject = Subjects.UserCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: UserCreatedEvent["data"], msg: Message) {
		const { id, handle } = data;
		const profile = Profiles.build({ id, handle });
		await profile.save();

		msg.ack();
	}
}
