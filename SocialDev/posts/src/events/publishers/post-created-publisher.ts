import { Publisher, Subjects, PostCreatedEvent } from "socialdev-common";

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
	readonly subject = Subjects.PostCreated;
}
