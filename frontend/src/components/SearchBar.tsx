import React from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'

interface props {
    className?: string;
}

const SearchBar = ({ className }: props) => {
    return (
        <InputGroup className={className}>
            <FormControl
                placeholder={"Find an Article here!"}
                aria-label={"Find an Article here!"}
                aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
                <Button variant="outline-primary">Search</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default SearchBar
