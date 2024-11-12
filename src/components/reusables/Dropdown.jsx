import React, { useState } from 'react';
import { Box, Select, FormControl, FormLabel, Heading } from '@chakra-ui/react';

export const CountryDropdowns = (props) => {
  // State for selected country and channel
  const [selectedCountry, setSelectedCountry] = useState('');

  const {inputFieldHeight} = props
  // Handler functions for selection
  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box py="4" >
      {/* Enabled Country Dropdown */}
      <FormControl id="enabled-country">
        <FormLabel mb='30px'>
            <Heading size={'sm'}>Enabled Country</Heading>
        </FormLabel>
        <Select
          placeholder="Select Country"
          value={selectedCountry}
          onChange={handleCountrySelect}
          bgColor="white"
          color='text_gray'
          height={inputFieldHeight}
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

export const Channelsdropdown = (props) => {
    
    const { inputFieldHeight } = props;
  const [selectedChannel, setSelectedChannel] = useState('');

  const handleChannelSelect = (event) => {
    setSelectedChannel(event.target.value);
  };

    return (
        <Box  py="4">
            <FormControl id="enabled-channel">
                <FormLabel mb='30px'>
                    <Heading size={'sm'}>Enabled Channel</Heading>
                </FormLabel>
                <Select
                placeholder="Select Channel"
                value={selectedChannel}
                onChange={handleChannelSelect}
                bgColor="white"
                color='text_gray'
                height={inputFieldHeight}
                width='370px'
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
    const {width='370px'} = props
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
                width={width}
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