import React, { useState } from 'react';
import { Box, Select, FormControl, FormLabel, Heading } from '@chakra-ui/react';

export const CountryDropdowns = (props) => {
  // State for selected country and channel
  const [selectedCountry, setSelectedCountry] = useState('');

  const {inputFieldHeight='4rem', inputFieldWidth='360px'} = props
  // Handler functions for selection
  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box py="4" width={inputFieldWidth}>
      {/* Enabled Country Dropdown */}
      <FormControl id="enabled-country">
        <FormLabel mb='30px'>
            <Heading size={'sm'}>Enabled Country</Heading>
        </FormLabel>
        <Select            
        //   placeholder="Select Country"
          value={selectedCountry}
          onChange={handleCountrySelect}
          bgColor="white"
          color='text_gray'
          height={inputFieldHeight}
        //   width={inputFieldWidth}
          outline='none'
          _focus={{outline: 'none'}}
          border='none'
        >
          <option value="" disabled hidden>
                {"Select Country"}
          </option>  
          <option value="" disabled hidden>Please select </option>
          <option mt='20px' value="Ghana">Ghana</option>
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
    
    const { inputFieldHeight='4rem', inputFieldWidth='360px' } = props;
  const [selectedChannel, setSelectedChannel] = useState('');

  const handleChannelSelect = (event) => {
    setSelectedChannel(event.target.value);
  };

    return (
        <Box  py="4" width={inputFieldWidth}>
            <FormControl id="enabled-channel">
                <FormLabel mb='30px'>
                    <Heading size={'sm'}>Enabled Channel</Heading>
                </FormLabel>
                <Select
                // placeholder="Select Channel"
                value={selectedChannel || ''}
                onChange={handleChannelSelect}
                bgColor="white"
                color='text_gray'
                height={inputFieldHeight}
                // width=
                outline='none'
                _focus={{outline: 'none'}}
                border='none'
                >
                <option value="" disabled hidden>
                    {"Select Channel"}
                </option>
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
    const {
        inputFieldHeight = '4rem',
        width = '370px',
        marginBottom = '30px',
        display = 'block',
        placeholder = 'Please Select',
        
    } = props;

    return (
        <Box width={width}>
            <FormControl id={props.id} display={display}>
                <FormLabel mb={marginBottom} height="fit-content" alignSelf="center">
                    <Heading size="sm">{props.label}</Heading>
                </FormLabel>
                <Select
                    value={props.value || ''}
                    onChange={props.onChange}
                    bgColor="white"
                    height={inputFieldHeight}
                    outline="none"
                    _focus={{ outline: 'none' }}
                    border="none"
                >
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                    {props.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
