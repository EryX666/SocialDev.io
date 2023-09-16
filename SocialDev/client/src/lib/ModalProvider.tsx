import React, {
	useContext,
	useState,
	ReactNode,
	CSSProperties,
	createContext,
} from "react";
import ReactDOM from "react-dom";
import Modal from "components/Modals/base";
import { Transition } from "@headlessui/react";

interface ModalProviderProps {
	children: ReactNode;
}

interface ModalProps {
	title?: ReactNode;
	content?: ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
	style?: CSSProperties;
	onClose: () => void;
}

interface ModalContextProps {
	isVisible: boolean;
	showModal: () => void;
	hideModal: () => void;
	modalProps: ModalProps;
	setModalProps: (props: ModalProps) => void;
}

const defaultModalProps: ModalProps = {
	title: null,
	content: null,
	size: "md",
	style: {},
	onClose: () => {},
};

export const ModalContext = createContext<ModalContextProps | undefined>(
	undefined,
);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [modalProps, setModalProps] = useState<ModalProps>(defaultModalProps);

	const showModal = () => setIsVisible(true);
	const hideModal = () => setIsVisible(false);

	console.log("Modal is visible:", isVisible);

	return (
		<ModalContext.Provider
			value={{
				isVisible,
				showModal,
				hideModal,
				modalProps,
				setModalProps,
			}}>
			{children}
			{isVisible &&
				ReactDOM.createPortal(
					<Transition
						appear
						show={isVisible}
						enter="ease-out duration-600"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Modal {...modalProps} onClose={hideModal} />
					</Transition>,
					document.body,
				)}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};
