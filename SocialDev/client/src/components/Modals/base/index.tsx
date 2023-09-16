import React, { CSSProperties, ReactNode } from "react";
import { useModal } from "lib/ModalProvider";
import { Transition } from "@headlessui/react";

interface ModalProps {
	title?: ReactNode;
	content?: ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
	style?: CSSProperties;
	onClose: () => void;
}

const Modal: React.FC<ModalProps & { onClose: () => void }> = ({
	title = <span>Generic Title</span>,
	content = <span>Generic Content</span>,
	size,
	onClose,
}) => {
	const { isVisible } = useModal();
	const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	let modalSizeClass;
	switch (size) {
		case "sm":
			modalSizeClass = "max-w-sm";
			break;
		case "md":
			modalSizeClass = "max-w-md";
			break;
		case "lg":
			modalSizeClass = "max-w-lg";
			break;
		case "xl":
			modalSizeClass = "max-w-xl";
			break;
		default:
			modalSizeClass = "max-w-md";
	}

	return (
		<Transition
			appear
			show={isVisible}
			enter="ease-out duration-600"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0">
			<div
				className="fixed inset-0 flex items-center justify-center bg-black/30"
				onClick={handleClickOutside}>
				<div
					className={`relative z-50 flex flex-col h-fit w-full ${modalSizeClass} transform rounded-2xl dark:bg-gray-700 shadow-xl transition-all p-4`}>
					<div className="flex flex-row justify-center items-center text-lg font-medium leading-6 dark:text-gray-300 text-center mb-4 relative">
						{title}
						<button
							className="absolute right-4 text-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto dark:bg-gray-800 dark:hover:text-white"
							onClick={onClose}>
							{/* SVG close icon */}
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
						</button>
					</div>
					<span className="w-full p-[1px] bg-gray-500"></span>
					<div className="w-11/12 mt-4 text-white">{content}</div>
				</div>
			</div>
		</Transition>
	);
};

export default Modal;
