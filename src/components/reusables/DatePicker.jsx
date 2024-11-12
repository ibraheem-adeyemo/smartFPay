// EndDatePicker.js
import React, { useState } from 'react';
import { InputGroup, Input, InputRightElement, FormControl, FormLabel, Box, Flex, Heading } from '@chakra-ui/react';
import { MdOutlineCalendarToday } from "react-icons/md";
import DatePicker from 'react-datepicker';

export const DatePickerComponent = ({ label, startDate, inputFieldHeight='initial', endDate, onEndDateChange, marginTop='10px', size='md', labelMb='30px', width='350px', placeholder="Please Select", bgColor='none', ...rest }) => {
  return (
    <FormControl id="end-date">
      <FormLabel mb={labelMb}>
        <Heading size={size}>{label}</Heading>
      </FormLabel>
      {/* <InputGroup> */}
        <DatePicker
          selected={endDate}
          onChange={onEndDateChange}
          selectsEnd
        //   startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
          customInput={
            <InputGroup width={width} bgColor={bgColor} {...rest} alignItems='center' height={inputFieldHeight}>
                <Input placeholder={placeholder} border='none' />
                <InputRightElement pointerEvents="none" alignSelf='center' mt={marginTop}>
                    <MdOutlineCalendarToday fontSize='24px' color="text_gray" />
                </InputRightElement>
            </InputGroup>
            }
        />
        {/* <InputRightElement pointerEvents="none">
          <FaCalendar color="gray.400" />
        </InputRightElement> */}
      {/* </InputGroup> */}
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
      <Flex borderRadius="md" justifyContent='space-between' width="800px">
        <DatePickerComponent label={'start date'} bgColor='white' onStartDateChange={handleStartDateChange} />
        <DatePickerComponent label={'end date'} bgColor='white' endDate={endDate} onEndDateChange={handleEndDateChange} />
      </Flex>
    );
  };