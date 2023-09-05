import React, {
	useContext,
	useState,
	useRef,
	ReactNode,
	CSSProperties,
	createContext,
} from "react";
import ReactDOM from "react-dom";

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

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [modalProps, setModalProps] = useState<ModalProps>(defaultModalProps);

	const showModal = () => setIsVisible(true);
	const hideModal = () => setIsVisible(false);

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
					<Modal {...modalProps} onClose={hideModal} />,
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

const Modal: React.FC<ModalProps & { onClose: () => void }> = ({
	title,
	content,
	size,
	style,
	onClose,
}) => {
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
		<div className="modal-overlay" onClick={handleClickOutside}>
			<div className={`modal modal-${size}`} style={style}>
				{title && <div className="modal-header">{title}</div>}
				<div className="modal-content">{content}</div>
				<div className="modal-footer">
					<button onClick={onClose}>Close</button>
				</div>
			</div>
		</div>
	);
};
