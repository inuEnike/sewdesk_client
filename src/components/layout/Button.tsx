import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    variant?: 'sm' | 'md' | 'full';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
};

const Button = ({
    children,
    variant = 'md',
    onClick,
    type = 'button',
    disabled = false,
}: ButtonProps) => {
    const variants = {
        sm: 'w-fit px-4',
        md: 'w-fit px-6',
        full: 'w-full',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`h-11 rounded-md bg-primary text-sm font-medium text-white ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
        >
            {children}
        </button>
    );
};

export default Button;
