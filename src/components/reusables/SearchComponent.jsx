import React from 'react';
import { InputGroup, Input, InputLeftElement, Box } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const SearchComponent = ({ placeholder = "Search...", onSearch }) => {
  const handleInputChange = (event) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <Box width='800px' height={'70px'}>
      <InputGroup height='100%'>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.400" />
        </InputLeftElement>
        <Input
          height='100%'
          type="text"
          placeholder={placeholder}
          onChange={handleInputChange}
          bg="white"
          border='none'
        />
      </InputGroup>
    </Box>
  );
};

export default SearchComponent;
