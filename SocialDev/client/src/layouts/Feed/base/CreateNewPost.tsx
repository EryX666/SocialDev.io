import React, {
	// useState,
	// Fragment,
	useContext,
	// useEffect,
	// useRef,
} from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { useCreateNewPost } from "services/internal/postQueries";
import Avatar from "components/user/Avatar";
import { AuthContext } from "lib/authProvider";
// import DialogBox from "components/DialogBox/DialogBox";
import { useModal } from "lib/ModalProvider";
import CreateNewPostModal from "components/Modals/CreateNewPost/CreateNewPostModal";

const CreateNewPost: React.FC = () => {
	const { showModal, setModalProps } = useModal();
	const { currentUser } = useContext(AuthContext);
	// const [isOpen, setIsOpen] = useState<boolean>(false);
	// const [postText, setPostText] = useState<string>("");
	// const mutation = useCreateNewPost();
	// const cancelButtonRef = useRef(null);

	const openCustomModal = () => {
		setModalProps({
			title: <span>New Post</span>,
			content: <CreateNewPostModal />,
			size: "sm",
			style: {},
			onClose: () => {},
		});
		showModal();
	};

	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	console.log("submited:", postText);
	// 	mutation.mutate({ text: postText });
	// };

	// function closeModal() {
	// 	setIsOpen(false);
	// }

	// function openModal() {
	// 	setIsOpen(true);
	// }

	// useEffect(() => {
	// 	if (mutation.isSuccess) {
	// 		setPostText("");
	// 		setIsOpen(false);
	// 	}
	// }, [mutation.isSuccess]);

	// useEffect(() => {}, [isOpen]);

	return (
		<div
			id="create-new-post"
			className="flex container max-w-2xl justify-center items-center p-6 mt-6 h-full bg-gray-400 text-black rounded-lg shadow bg-secondary-color dark:border-gray-700 my-6">
			<div id="user-avatar" className="">
				<Avatar />
			</div>
			<div className="flex-grow pl-3 pr-3">
				<span
					role="button"
					onClick={openCustomModal}
					className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-full inline-block">
					{`What do you want to share ${currentUser?.currentUser?.handle}?`}
				</span>
			</div>

			{/* TODO: Remove Old Code */}
			{/* 
			{isOpen ? (
				<DialogBox
					isOpen={isOpen}
					closeModal={closeModal}
					title={<span>New Post</span>}
					content={
						<form
							onSubmit={handleSubmit}
							className="flex flex-col justify-center">
							<input
								className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
								type="text"
								value={postText}
								placeholder={`What do you want to share ${currentUser?.currentUser?.handle}?`}
								onChange={(e) => setPostText(e.target.value)}
							/>
							<button
								className="bg-green-500 w-1/4"
								type="submit">
								Submit
							</button>
						</form>
					}
				/>
			) : null} */}

			{/* 
			<Transition
				appear
				show={isOpen}
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<Dialog as="div" className="relative z-50" onClose={closeModal}>
					<Transition.Child>
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 overflow-y-scroll">
							<div className="flex min-h-full items-center justify-center p-4">
								<Dialog.Panel className="grid w-full max-w-2xl transform overflow-hidden rounded-2xl dark:bg-gray-700 pt-6 pb-6 text-left align-middle shadow-xl transition-all divide-x">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 dark:text-gray-300 text-center"
									>
										Create a new Post
										<button
											type="button"
											className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
											data-modal-toggle="authentication-modal"
											onClick={() => closeModal()}
											ref={cancelButtonRef}
										>
											<svg
												aria-hidden="true"
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												></path>
											</svg>
											<span className="sr-only">Close modal</span>
										</button>
									</Dialog.Title>
									<span className="w-full p-[1px] bg-gray-500"></span>
									
								</Dialog.Panel>
							</div>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition> */}
		</div>
	);
};

export default CreateNewPost;
