import React, { useState, Fragment, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCreateNewPost } from "services/internal/postQueries";
import Avatar from "components/user/Avatar";
import { AuthContext } from "lib/authProvider";

const CreateNewPost: React.FC = () => {
	const { currentUser } = useContext(AuthContext);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [postText, setPostText] = useState<string>("");
	const mutation = useCreateNewPost();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submited:", postText);
		mutation.mutate({ text: postText });
	};

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	useEffect(() => {
		if (mutation.isSuccess) {
			setPostText("");
			setIsOpen(false);
		}
	}, [mutation.isSuccess]);

	return (
		<div
			id="create-new-post"
			className="flex container max-w-2xl justify-center items-center p-6 mt-6 h-full bg-gray-400 text-black rounded-lg shadow bg-secondary-color dark:border-gray-700 my-6"
		>
			<div id="user-avatar" className="">
				<Avatar />
			</div>
			<div className="flex-grow pl-3 pr-3">
				<span
					role="button"
					onClick={openModal}
					className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-full inline-block"
				>
					{`What do you want to share ${currentUser?.currentUser?.handle}?`}
				</span>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>
					{/* The backdrop, rendered as a fixed sibling to the panel container */}
					<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

					{/* Full-screen scrollable container */}
					<div className="fixed inset-0 overflow-y-auto">
						{/* Container to center the panel */}
						<div className="flex min-h-full items-center justify-center p-4">
							{/* The actual dialog panel  */}
							<div className="fixed inset-0 overflow-y-auto">
								<div className="flex min-h-full items-center justify-center p-4 text-center">
									<Transition.Child
										as={Fragment}
										enter="ease-out duration-300"
										enterFrom="opacity-0 scale-95"
										enterTo="opacity-100 scale-100"
										leave="ease-in duration-200"
										leaveFrom="opacity-100 scale-100"
										leaveTo="opacity-0 scale-95"
									>
										<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
											<Dialog.Title
												as="h3"
												className="text-lg font-medium leading-6 text-gray-900"
											>
												Create a new Post
											</Dialog.Title>
											<form
												onSubmit={handleSubmit}
												className="flex flex-col justify-center"
											>
												<input
													className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
													type="text"
													value={postText}
													placeholder={`What do you want to share ${currentUser?.currentUser?.handle}?`}
													onChange={(e) => setPostText(e.target.value)}
												/>
												<button className="bg-green-500" type="submit">
													Submit
												</button>
											</form>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition>
			{/*  */}
		</div>
	);
};

export default CreateNewPost;
