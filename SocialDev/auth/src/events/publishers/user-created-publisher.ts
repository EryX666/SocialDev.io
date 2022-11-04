import { Publisher, Subjects, UserCreatedEvent } from "socialdev-common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
	readonly subject = Subjects.UserCreated;
}
