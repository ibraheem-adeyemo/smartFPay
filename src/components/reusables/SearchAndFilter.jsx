import React, { useState } from 'react';
import { Box, HStack, Flex, Button } from '@chakra-ui/react'
import { Channelsdropdown, CountryDropdowns, ReusableDropdown } from '../reusables/Dropdown';
import { DatePickerComponent, DateRangeFilter } from '../reusables/DatePicker';
import SearchComponent from '../reusables/SearchComponent';

export const SearchAndFilter = () => {
    const [selectedValue, setSelectedValue] = useState('')
    return(
        <Box>
             <HStack spacing={6}>
             <ReusableDropdown
                id="subscribe"
                label="Status"
                value={selectedValue} // Use state to control the value
                onChange={(e) => setSelectedValue(e.target.value)} // Update state on change
                options={[
                    { label: 'Subscribed', value: 'Subscribed' },
                    { label: 'Unsubscribed', value: 'Unsubscribed' },
                ]}
                width="33%"
                placeholder="Please Select"
            />
                <DatePickerComponent width='33%' borderRadius='8px' size='sm' label='Start Date' bgColor='white' />
                <DatePickerComponent width='33%' borderRadius='8px' size='sm' label='End Date' bgColor='white' />
            </HStack>
            <Flex justifyContent='space-between' my='2rem'>
                <SearchComponent placeholder="Search by account number, account name"
                    onSearch={(query) => console.log("Searching for:")} />
                    <Button colorScheme="blue" variant="outline" size="md" bgColor='light-blue' height={'70px'} width='130px' alignSelf='center'>
                        Search
                    </Button>
            </Flex>
        </Box>
    )
}