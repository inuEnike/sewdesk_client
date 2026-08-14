'use client';

import { useState } from 'react';
import { IoMdEye } from 'react-icons/io';
import { IoEyeOff } from 'react-icons/io5';

interface IFormInput extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    isPassword?: boolean;
    isTextArea?: boolean;
}

const FormInput = ({ label, id, isPassword, isTextArea, ...inputProps }: IFormInput) => {
    const [password, setPassword] = useState(true);

    const handleToggle = () => {
        setPassword((prev) => !prev);
    };

    return (
        <div className="my-5 flex flex-col gap-2 w-full">
            <label htmlFor={id} className="text-sm">
                {label}
            </label>

            {isTextArea ? (
                <textarea
                    id={id}
                    className="shadows-sm border rounded-md text-sm border-border px-3.5 py-3 outline-0 min-h-32 resize-none"
                    {...inputProps}
                />
            ) : isPassword ? (
                <div className="flex items-center shadows-sm border rounded-md text-sm border-border px-3.5 h-11">
                    <input
                        id={id}
                        className="w-full outline-0"
                        type={password ? 'password' : 'text'}
                        {...inputProps}
                    />

                    {password ? (
                        <IoEyeOff className="text-lg cursor-pointer" onClick={handleToggle} />
                    ) : (
                        <IoMdEye className="text-lg cursor-pointer" onClick={handleToggle} />
                    )}
                </div>
            ) : (
                <input
                    id={id}
                    className="shadows-sm border rounded-md text-sm border-border px-3.5 outline-0 h-11"
                    {...inputProps}
                />
            )}
        </div>
    );
};

export default FormInput;
