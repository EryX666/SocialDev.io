import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
	isOpen: boolean;
	closeModal: () => void;
	title?: React.ReactNode;
	content?: React.ReactNode;
}

const DialogBox = (props: Props) => {
	const cancelButtonRef = useRef(null);

	return (
		<Transition
			appear
			show={props.isOpen ? true : false}
			as={Fragment}
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0">
			<Dialog
				as="div"
				className="relative z-50"
				onClose={props.closeModal}>
				<Transition.Child>
					<div
						className="fixed inset-0 bg-black/30"
						aria-hidden="true"
					/>
					<div className="fixed inset-0 overflow-y-scroll">
						<div className="flex min-h-full items-center justify-center p-4">
							<Dialog.Panel className="flex flex-col h-fit w-full max-w-2xl transform rounded-2xl dark:bg-gray-700 text-left align-middle shadow-xl transition-all ">
								<Dialog.Title
									as="h3"
									className="flex flex-row justify-center items-center flex-1 text-lg font-medium leading-6 dark:text-gray-300 text-center mb-4">
									{props.title ? (
										props.title
									) : (
										<span>Generic Title</span>
									)}
									<button
										type="button"
										className="absolute right-4 text-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex dark:bg-gray-800 dark:hover:text-white mr-2"
										data-modal-toggle="authentication-modal"
										onClick={props.closeModal}
										ref={cancelButtonRef}>
										<svg
											aria-hidden="true"
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clipRule="evenodd"></path>
										</svg>
										<span className="sr-only">
											Close modal
										</span>
									</button>
								</Dialog.Title>
								<span className="w-full p-[1px] bg-gray-500"></span>
								<div className="w-11/12">
									{props.content ? (
										props.content
									) : (
										<span>Generic Content</span>
									)}
								</div>
							</Dialog.Panel>
						</div>
					</div>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
};

export default DialogBox;
