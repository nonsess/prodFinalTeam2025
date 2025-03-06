import {Button} from "@/components/ui/button";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg w-full max-w-xl mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <Button variant="ghost" onClick={onClose}>✕</Button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
