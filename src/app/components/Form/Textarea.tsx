import React from 'react';
import Label from "@/app/components/Form/Label";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    label: string;
}

const Textarea: React.FC<TextareaProps> = ( { label, id, ...rest } ) => {
	return (
		<div>
			<Label htmlFor={id}>{label}</Label>
			<textarea
				id={id}
				className="border rounded w-full py-2 px-3"
				{...rest}
			/>
		</div>
	);
};

export default Textarea;
