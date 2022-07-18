import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

interface props {
	handler: (t: string) => void;
	value: string;
	className?: string;
}

const SearchBar = ({ className, handler, value }: props): JSX.Element => {
	return (
		<InputGroup className={className}>
			<FormControl
				placeholder={'Find an Article here!'}
				aria-label={'Find an Article here!'}
				aria-describedby="basic-addon2"
				onChange={(e) => handler(e.target.value)}
				value={value}
			/>
		</InputGroup>
	);
};

export default SearchBar;
