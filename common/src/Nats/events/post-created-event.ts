import { Subjects } from "../subjects";

export interface PostCreatedEvent {
	subject: Subjects.PostCreated;
	data: {
		id: string;
	};
}
