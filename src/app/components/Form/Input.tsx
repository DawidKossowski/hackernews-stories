import React from 'react';
import Label from "@/app/components/Form/Label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
}

const Input: React.FC<InputProps> = ( { label, id, ...rest } ) => {
	return (
		<>
			<Label htmlFor={id}>{label}</Label>
			<input
				id={id}
				className="border rounded w-full py-2 px-3"
				{...rest}
			/>
		</>
	);
};

export default Input;
