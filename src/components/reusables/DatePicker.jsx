// EndDatePicker.js
import React, { useState } from 'react';
import { InputGroup, Input, InputRightElement, FormControl, FormLabel, Box, Flex, Heading } from '@chakra-ui/react';
import { FaCalendar } from 'react-icons/fa6';
import DatePicker from 'react-datepicker';

export const DatePickerComponent = ({ label, startDate, endDate, onEndDateChange }) => {
  return (
    <FormControl id="end-date">
      <FormLabel>
        <Heading size={'md'}>{label}</Heading>
      </FormLabel>
      <InputGroup>
        <DatePicker
          selected={endDate}
          onChange={onEndDateChange}
          selectsEnd
        //   startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
          customInput={<Input bg="white" placeholder="Select End Date" />}
        />
        <InputRightElement pointerEvents="none">
          <FaCalendar color="gray.400" />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};


export const DateRangeFilter = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    // Handlers to update start and end dates
    const handleStartDateChange = (date) => setStartDate(date);
    const handleEndDateChange = (date) => setEndDate(date);
  
    return (
      <Flex p="4" bg="gray.50" borderRadius="md" width="800px">
        <DatePickerComponent label={'start date'} onStartDateChange={handleStartDateChange} />
        <DatePickerComponent label={'end date'} endDate={endDate} onEndDateChange={handleEndDateChange} />
      </Flex>
    );
  };