import React, { useState } from 'react';
import { Box, Select, FormControl, FormLabel, Heading } from '@chakra-ui/react';

export const CountryDropdowns = () => {
  // State for selected country and channel
  const [selectedCountry, setSelectedCountry] = useState('');

  // Handler functions for selection
  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box py="4" >
      {/* Enabled Country Dropdown */}
      <FormControl id="enabled-country" mb="4">
        <FormLabel>
            <Heading size={'sm'}>Enabled Country</Heading>
        </FormLabel>
        <Select
          placeholder="Select Country"
          value={selectedCountry}
          onChange={handleCountrySelect}
          bgColor="white"
          width='300px'
          outline='none'
          _focus={{outline: 'none'}}
          border='none'
        >
          <option value="Ghana">Ghana</option>
          <option value="Kenya">Kenya</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Cameroon">Cameroon</option>
        </Select>
      </FormControl>

      {/* Enabled Channel Dropdown */}
      
    </Box>
  );
};

export const Channelsdropdown = () => {
    
  const [selectedChannel, setSelectedChannel] = useState('');

  const handleChannelSelect = (event) => {
    setSelectedChannel(event.target.value);
  };

    return (
        <Box  py="4">
            <FormControl id="enabled-channel">
                <FormLabel>
                    <Heading size={'sm'}>Enabled Channel</Heading>
                </FormLabel>
                <Select
                placeholder="Select Channel"
                value={selectedChannel}
                onChange={handleChannelSelect}
                bgColor="white"
                width='300px'
                outline='none'
                _focus={{outline: 'none'}}
                border='none'
                >
                <option value="ATM">ATM</option>
                <option value="POS">POS</option>
                <option value="WEB">WEB</option>
                <option value="USSD">USSD</option>
                </Select>
            </FormControl>
        </Box>
    )
}

export const ReusableDropdown = (props) => {
    return (
        <Box  py="4">
            <FormControl id={props.id} display='flex'>
                <FormLabel>
                    <Heading size={'sm'} pt='10px'>{props.value}</Heading>
                </FormLabel>
                <Select
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                defaultValue={props.defaultValue}
                bgColor="white"
                width='30px'
                outline='none'
                _focus={{outline: 'none'}}
                border='none'
                >
                {props.options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    )
                })}
                </Select>
            </FormControl>
        </Box>
    )
}