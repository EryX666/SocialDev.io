import {
	Publisher,
	Subjects,
	UserCreatedEvent,
} from "@obiproduction/socialnet-api-common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
	readonly subject = Subjects.UserCreated;
}
