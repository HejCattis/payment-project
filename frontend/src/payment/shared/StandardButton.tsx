import React from 'react';

interface StandardButtonProps {
    text: string | React.ReactNode;
    onClick: () => void;
    loading?: boolean;
    type?: 'submit' | 'button' | 'reset';
    disabled?: boolean;
}

const StandardButton = ({
    text,
    onClick,
    loading = false,
    type = 'button',
    disabled = false,
}: StandardButtonProps) => {
    return (
        <React.Fragment>
            {loading ? (
                <button
                    type='button'
                    disabled
                    className="flex w-full justify-center rounded bg-blue-500 py-2.5 font-medium tracking-wide text-white"
                >
                    <div className="h-7 w-7 animate-spin rounded-full border-4 border-white border-t-blue-700" />
                </button>
            ) : (
                <button
                    className={`flex gap-2 min-h-12 w-full items-center justify-center rounded bg-blue-500 px-4 py-2 font-medium tracking-wide text-white active:bg-blue-700
                ${disabled && 'opacity-50'}
                `}
                    onClick={onClick}
                    type={type}
                    disabled={disabled}
                >
                    {text}
                </button>
            )}
        </React.Fragment>
    );
}

export default StandardButton;
