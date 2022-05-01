import {
	Publisher,
	Subjects,
	PostCreatedEvent,
} from "@obiproduction/socialnet-api-common";

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
	readonly subject = Subjects.PostCreated;
}
