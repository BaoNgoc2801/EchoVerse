type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
};

export function Button({ children, onClick, disabled, className }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded text-white ${disabled ? "bg-gray-400" : className}`}
        >
            {children}
        </button>
    );
}
