import { Publisher, Subjects, PostDeletedEvent } from "socialdev-common";

export class PostDeletedPublisher extends Publisher<PostDeletedEvent> {
	readonly subject = Subjects.PostDeleted;
}
