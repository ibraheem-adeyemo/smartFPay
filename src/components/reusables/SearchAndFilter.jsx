import React from 'react';
import { Box, HStack, Flex, Button } from '@chakra-ui/react'
import { Channelsdropdown, CountryDropdowns } from '../reusables/Dropdown';
import { DatePickerComponent, DateRangeFilter } from '../reusables/DatePicker';
import SearchComponent from '../reusables/SearchComponent';

export const SearchAndFilter = () => {
    return(
        <Box>
             <HStack spacing={6}>
                <CountryDropdowns inputFieldWidth='25%' />
                <Channelsdropdown inputFieldWidth='25%' />
                <DatePickerComponent width='25%' borderRadius='8px' size='sm' label='Start Date' bgColor='white' />
                <DatePickerComponent width='25%' borderRadius='8px' size='sm' label='End Date' bgColor='white' />
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