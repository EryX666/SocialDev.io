import {
	Publisher,
	Subjects,
	PostDeletedEvent,
} from "@obiproduction/socialnet-api-common";

export class PostDeletedPublisher extends Publisher<PostDeletedEvent> {
	readonly subject = Subjects.PostDeleted;
}
